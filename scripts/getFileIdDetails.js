require("dotenv").config();
const { ethers } = require("ethers");
const aggregatorAbi = require("../abi/aggregatorABI");

const callFileDetails = async (fileId) => {
  const provider = new ethers.providers.JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1");
  const privateKey = process.env.PRIVATE_KEY; //wallet private key
  const signer = new ethers.Wallet(privateKey, provider);

  const contractAddress = "0x27235FbFee0F5519A8786EA7Fc13258234aC1847";

  const contract = new ethers.Contract(contractAddress, aggregatorAbi, signer);

  let fileInfo = await contract.getDealDetails(fileId, {
    gasLimit: 50_000_000,
  });

  // let GetDetails = await contract.idToUser(fileId);
  const bytes = ethers.utils.arrayify(fileInfo[0]);
  console.log("CID: ", ethers.utils.toUtf8String(bytes));
  console.log("DealID: ", Number(fileInfo[1]));  // Deal ID 0 imply deal is not created
};

callFileDetails(9)
