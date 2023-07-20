require("dotenv").config();
const { ethers } = require("ethers");
const aggregatorAbi = require("./ABI");


const StoreData = async () => {
  const provider = new ethers.providers.JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1");
  const privateKey = process.env.PRIVATE_KEY; //wallet private key
  const signer = new ethers.Wallet(privateKey, provider);

  const contractAddress = "0xAD978E56d3264673bA8705c1e7b2f00932345B1D";

  const contract = new ethers.Contract(contractAddress, aggregatorAbi, signer);

  // Id 1
  // const fileLink = "baga6ea4seaqdyplmndx33rub426i74muaroivm5lnebayap2hon7lfakpkgeici";
  const fileLink = "https://gateway.lighthouse.storage/ipfs/bafkreia4ruswe7ghckleh3lmpujo5asrnd7hrtu5r23zjk2robpcoend34";
  const fileLinkBytes = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(fileLink));
  // const fileSize = 512;

  // Id 2
  // const fileLinkBytes = "0x0181e2039220200d0e0a0100030000000000000000000000000000000000000000000000000000";
  // const fileSize = 536870912;

  let StoreData = await contract.StoreData(fileLinkBytes, {
    gasLimit: 50_000_000,
  });

  console.log(StoreData);
  console.log("transaction done");
};

// Call the addPlan function and catch if there is any error
// StoreData()
//   .then(() => process.exit(0))
//   .catch(error => {
//     console.error(error);
//     process.exit(1);
//   });

module.exports = StoreData;
