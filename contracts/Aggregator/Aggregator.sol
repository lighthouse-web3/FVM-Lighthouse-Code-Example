// SPDX-License-Identifier: AGPL-3.0

pragma solidity 0.8.17;

import {IAggregatorOracle} from "../AggregatorOracle/IAggregatorOracle.sol";
import {Proof} from "../DataSegment/Proof.sol";
import {InclusionProof, InclusionVerifierData, InclusionAuxData} from "../DataSegment/ProofTypes.sol";
import {MarketAPI} from "@zondax/filecoin-solidity/contracts/v0.8/MarketAPI.sol";
import {MarketTypes} from "@zondax/filecoin-solidity/contracts/v0.8/types/MarketTypes.sol";
import {CommonTypes} from "@zondax/filecoin-solidity/contracts/v0.8/types/CommonTypes.sol";

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
     * @dev fileId -> dealDetails struct
     */
    mapping(uint => dealDetails) public idToUser;

    /**
     * @notice mapping to store file ID against deal Id
     * @dev file ID -> deal ID
     */
    mapping(uint => uint) public fileToDealId;

    /**
     * @notice event storing the details of the file
     * @param fileLink link of the file
     * @dev true means free trial, false means Paid user
     * @param fileId file id
     * @dev event listen by the backend services
     */
    event DataInfo(bytes fileLink, uint indexed fileId, address user);

    /**
     * @notice event to emit when file is not stored
     * @param fileId file id
     */
    event DealNotCreated(uint fileId);

    /**
     * @notice event to emit when file is stored
     * @param fileId file id
     */
    event DealCreated(uint fileId, uint dealId);

    /// @notice Struct to store all the details about file storage
    struct dealDetails {
        address user; // address of the user
        bytes fileLink; // link of the file
    }

    /**
     * @notice function to store file
     * @param _fileLink file link of the file
     */
    function StoreData(bytes calldata _fileLink) external {
        unchecked {
            ++fileId;
        }
        idToUser[fileId].user = msg.sender;
        idToUser[fileId].fileLink = _fileLink;

        emit DataInfo(_fileLink, fileId, msg.sender);
    }

    /**
     * @dev verifyPodsi is a callback function that is called by the aggregator
     * @param _fileId is the transaction ID
     * @param _dealId is the deal ID
     * @param _proof is the inclusion proof
     * @param _verifierData is the verifier data
     * @return the aux data
     */
    function verifyPodsi(
        uint256 _fileId,
        uint64 _dealId,
        InclusionProof memory _proof,
        InclusionVerifierData memory _verifierData
    ) external returns (InclusionAuxData memory) {
        require(_fileId <= fileId, "verifyPodsi: invalid transaction id");
        // Emit the event
        emit CompleteAggregatorRequest(_fileId, _dealId);

        // save the _dealId if it is not already saved
        bytes memory fileLink = idToUser[_fileId].fileLink;
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
     * @dev called by the lighthouse aggregator backend
     */
    function setDealDetails(
        uint _fileId,
        uint _dealId,
        bool _isMigrated
    ) external {
        if (!_isMigrated) {
            failedMigration[_fileId] = true;
            emit DealNotCreated(_fileId);
            return;
        }
        fileToDealId[_fileId] = _dealId;
        emit DealCreated(_fileId, _dealId);
    }

    // ////////   GETTER FUNCTION ///////////////////

    /**
     * @notice function to get the Deal id from file id
     * @param _fileId unique id of file
     * @dev called by the user
     */
    function getDealId(uint _fileId) external view returns (uint) {
        return fileToDealId[_fileId];
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
     */
    function checkDealExpire(uint64 _dealId) external view returns (bool) {
        MarketTypes.GetDealActivationReturn memory ret = MarketAPI
            .getDealActivation(_dealId);
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
        MarketTypes.GetDealTermReturn memory ret = MarketAPI.getDealTerm(
            _dealId
        );
        int64 end = CommonTypes.ChainEpoch.unwrap(ret.end);
        uint64 currentBlock = uint64(block.number);
        int64 currentBlockInt = int64(currentBlock);
        return (end - currentBlockInt);
    }

    /**
     * @notice getDeals returns all deals for a file
     * @param _fileLink Link of the file
     * @return the deal IDs
     */
    function getDeals(
        bytes memory _fileLink
    ) external view returns (uint64[] memory) {
        return fileToDealIds[_fileLink];
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
    function getFileDetails(
        uint _fileId
    ) external view returns (address, bytes memory, uint, bool) {
        bool fileMigrated = checkMigration(_fileId);
        return (
            idToUser[_fileId].user,
            idToUser[_fileId].fileLink,
            fileToDealId[_fileId],
            fileMigrated
        );
    }
}
