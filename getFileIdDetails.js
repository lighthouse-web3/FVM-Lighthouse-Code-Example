require("dotenv").config();
const { ethers } = require("ethers");
const aggregatorAbi = require("./abi/aggregator");

const callFileDetails = async () => {
  const provider = new ethers.providers.JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1");
  const privateKey = process.env.PRIVATE_KEY; //wallet private key
  const signer = new ethers.Wallet(privateKey, provider);

  const contractAddress = "0x0fA42ABab029c7064C9c8A628C9Bc602ea2e1B75";

  const contract = new ethers.Contract(contractAddress, aggregatorAbi, signer);

  const fileId = 8;
  //   const dealId = 34253;
  //   const isMigrated = true;

  let GetDealId = await contract.getDealId(fileId, {
    gasLimit: 50_000_000,
  });

  let GetDetails = await contract.idToUser(fileId);

  console.log(GetDealId);
  console.log("transaction done");

  console.log(GetDetails);
  console.log(ethers.utils.parseBytes32String(GetDetails));
//   let bytes = ethers.utils.arrayify(GetDetails);
//   console.log(bytes);
  console.log(hexToString(GetDetails));
};

// Call the addPlan function and catch if there is any error
callFileDetails()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
