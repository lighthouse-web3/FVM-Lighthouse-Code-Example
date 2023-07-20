require("dotenv").config();
const { ethers } = require("ethers");
const aggregatorAbi = require("./ABI");


const StoreData = async () => {
  const provider = new ethers.providers.JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1");
  const privateKey = process.env.PRIVATE_KEY; //wallet private key
  const signer = new ethers.Wallet(privateKey, provider);

  const contractAddress = "0xAD978E56d3264673bA8705c1e7b2f00932345B1D";

  const contract = new ethers.Contract(contractAddress, aggregatorAbi, signer);

  // Transcation detail
  const fileLink = "https://gateway.lighthouse.storage/ipfs/bafkreia4ruswe7ghckleh3lmpujo5asrnd7hrtu5r23zjk2robpcoend34";
  const fileLinkBytes = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(fileLink));
  

  let StoreData = await contract.StoreData(fileLinkBytes, {
    gasLimit: 50_000_000,
  });

  console.log(StoreData);
  console.log("transaction done");
};

module.exports = StoreData;
