require("dotenv").config();
const { ethers } = require("ethers");
const aggregatorAbi = require("../ABI/abi");


const callFileDetails = async () => {
  const provider = new ethers.providers.JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1");
  const privateKey = process.env.PRIVATE_KEY; //wallet private key
  const signer = new ethers.Wallet(privateKey, provider);

  const contractAddress = "0xAD978E56d3264673bA8705c1e7b2f00932345B1D";

  const contract = new ethers.Contract(contractAddress, aggregatorAbi, signer);

    const fileId = 6;

  let callFileDetails = await contract.getFileDetails(fileId, {
    gasLimit: 50_000_000,
  });

  console.log(callFileDetails);
  console.log("transaction done");
};


module.exports = callFileDetails;
