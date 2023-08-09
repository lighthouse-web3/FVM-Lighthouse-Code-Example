// SPDX-License-Identifier: AGPL-3.0

pragma solidity 0.8.17;

import { IAggregatorOracle } from "../AggregatorOracle/IAggregatorOracle.sol";
import { Proof } from "../DataSegment/Proof.sol";
import { InclusionProof, InclusionVerifierData, InclusionAuxData } from "../DataSegment/ProofTypes.sol";
import { MarketAPI } from "@zondax/filecoin-solidity/contracts/v0.8/MarketAPI.sol";
import { MarketTypes } from "@zondax/filecoin-solidity/contracts/v0.8/types/MarketTypes.sol";
import { CommonTypes } from "@zondax/filecoin-solidity/contracts/v0.8/types/CommonTypes.sol";

error INCORRECT_FILE_ID();

contract Aggregator is IAggregatorOracle, Proof {
    /// @notice file id of every potential file storage
    uint private fileId;

    /// @notice fileToDealIds maps fileLink to deal IDs
    /// @dev fileLink -> deal IDs[]
    mapping(bytes => uint64[]) public fileToDealIds;

    /// @notice mapping to track all the file id that are failed to get deal created
    /// @dev file id -> true (if failed to store file)
    mapping(uint => bool) public failedMigration;

    /**
     * @notice mapping to track all the file id storage info
     * @dev fileId -> fileDetails struct
     */
    mapping(uint => fileDetails) public fileIdToDetails;

    /**
     * @notice mapping to store file ID against deal Id
     * @dev file ID -> deal ID
     */
    mapping(uint => dealDetails) public fileIdToDealDetails;

    /**
     * @notice event storing the details of the file
     * @param fileLink link of the file
     * @dev true means free trial, false means Paid user
     * @param fileId file id
     * @dev event listen by the backend services
     */
    event DataInfo(
        bytes fileLink,
        uint indexed fileId,
        address user,
        bytes miner,
        uint num_copies,
        uint repair_threshold,
        uint renew_threshold
    );

    /**
     * @notice event to emit when file is not stored
     * @param fileId file id
     */
    event DealNotCreated(uint fileId);

    /**
     * @notice event to emit when file is stored
     * @param fileId file id
     */
    event DealCreated(uint fileId, uint dealId, bytes cid);

    /// @notice Struct to store all the details about proposed file
    struct fileDetails {
        address user; // address of the user
        bytes fileLink; // link of the file
    }

    /// @notice Struct to store all the details about stored file
    struct dealDetails {
        uint dealId;
        bytes cid;
    }

    /**
     * @notice function to store file
     * @param data_url file link of the file
     */
    function submit(
        bytes memory data_url,
        bytes memory miner,
        uint num_copies,
        uint repair_threshold,
        uint renew_threshold
    ) external returns (uint256 id) {
        unchecked {
            ++fileId;
        }
        fileIdToDetails[fileId].user = msg.sender;
        fileIdToDetails[fileId].fileLink = data_url;

        emit DataInfo(data_url, fileId, msg.sender, miner, num_copies, repair_threshold, renew_threshold);
        return fileId;
    }

    /**
     * @dev complete is a callback function that is called by the aggregator
     * @param _fileId is the transaction ID
     * @param _dealId is the deal ID
     * @param _proof is the inclusion proof
     * @param _verifierData is the verifier data
     * @return the aux data
     */
    function complete(
        uint256 _fileId,
        uint64 _dealId,
        InclusionProof memory _proof,
        InclusionVerifierData memory _verifierData
    ) external returns (InclusionAuxData memory) {
        require(_fileId <= fileId, "complete: invalid transaction id");
        // Emit the event
        emit CompleteAggregatorRequest(_fileId, _dealId);

        // save the _dealId if it is not already saved
        bytes memory fileLink = fileIdToDetails[_fileId].fileLink;
        for (uint i = 0; i < fileToDealIds[fileLink].length; i++) {
            if (fileToDealIds[fileLink][i] == _dealId) {
                return this.computeExpectedAuxData(_proof, _verifierData);
            }
        }
        fileToDealIds[fileLink].push(_dealId);

        // Perform validation logic
        // return this.computeExpectedAuxDataWithDeal(_dealId, _proof, _verifierData);
        return this.computeExpectedAuxData(_proof, _verifierData);
    }

    /**
     * @notice function to store file ID against deal Id
     * @param _fileId unique id of file
     * @param _dealId deal id
     * @param _isMigrated file stored
     * @param _cid of the file
     * @dev called by the lighthouse aggregator backend
     */
    function setDealDetails(uint _fileId, uint _dealId, bool _isMigrated, bytes memory _cid) external {
        if (!_isMigrated) {
            failedMigration[_fileId] = true;
            emit DealNotCreated(_fileId);
            return;
        }
        fileIdToDealDetails[_fileId].dealId = _dealId;
        fileIdToDealDetails[_fileId].cid = _cid;
        emit DealCreated(_fileId, _dealId, _cid);
    }

    //////////           GETTER FUNCTIONS          ///////////////

    /**
     * @notice function to get the Deal id and CID from file id
     * @param _fileId unique id of file
     * @dev called by the user
     */
    function getDealDetails(uint _fileId) external view returns (bytes memory, uint) {
        return (fileIdToDealDetails[_fileId].cid, fileIdToDealDetails[_fileId].dealId);
    }

    /**
     * @notice function to check that the file is stored
     * @param _fileId file id
     * @dev user will call this function. Return true is file is stored and false if file is not stored
     */
    function checkMigration(uint _fileId) public view returns (bool) {
        if (_fileId > fileId) {
            revert INCORRECT_FILE_ID();
        }
        if (failedMigration[_fileId]) return false;
        return true;
    }

    /**
     * @notice function to check that this deal is expired or not
     * @param _dealId Deal Id
     * @dev if MarketAPI.getDealActivation(_dealId) > 0 then deal is terminated and if the value is zero then deal is still stored in the network
     */
    function checkDealExpire(uint64 _dealId) external view returns (bool) {
        MarketTypes.GetDealActivationReturn memory ret = MarketAPI.getDealActivation(_dealId);
        if (CommonTypes.ChainEpoch.unwrap(ret.terminated) > 0) {
            return true;
        } else if (CommonTypes.ChainEpoch.unwrap(ret.activated) > 0) {
            return false;
        }
    }

    /**
     * @notice function to get time left before expire
     * @param _dealId Deal Id
     */
    function getTimeToDealExpire(uint64 _dealId) external view returns (int) {
        MarketTypes.GetDealTermReturn memory ret = MarketAPI.getDealTerm(_dealId);
        int64 end = CommonTypes.ChainEpoch.unwrap(ret.end);
        uint64 currentBlock = uint64(block.number);
        int64 currentBlockInt = int64(currentBlock);
        return (end - currentBlockInt);
    }

    /**
     * @notice getDeals returns all deals for a file
     * @param data_url Link of the file
     * @return the deal IDs
     */
    function getDeals(bytes memory data_url) external view returns (uint64[] memory) {
        return fileToDealIds[data_url];
    }

    /**
     * @notice function to get the current fileId
     */
    function getLatestId() external view returns (uint) {
        return fileId;
    }

    /**
     * @notice function to get all the details about the file
     * @param _fileId fileId
     * @return address of the user
     * @return link of the file
     * @return deal Id of the file
     * @return check file is migrated
     */
    function getFileDetails(uint _fileId) external view returns (address, bytes memory, uint, bool, bytes memory) {
        bool fileMigrated = checkMigration(_fileId);
        return (
            fileIdToDetails[_fileId].user,
            fileIdToDetails[_fileId].fileLink,
            fileIdToDealDetails[_fileId].dealId,
            fileMigrated,
            fileIdToDealDetails[_fileId].cid
        );
    }
}
