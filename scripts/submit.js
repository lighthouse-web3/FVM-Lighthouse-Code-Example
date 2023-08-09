require("dotenv").config();
const { ethers } = require("ethers");
const aggregatorAbi = require("../abi/aggregatorABI");

const submit = async () => {
  const provider = new ethers.providers.JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1");
  const privateKey = "0x6aa0ee41fa9cf65f90c06e5db8fa2834399b59b37974b21f2e405955630d472a"//process.env.PRIVATE_KEY; //wallet private key
  const signer = new ethers.Wallet(privateKey, provider);

  const contractAddress = "0x36F6eBc3dDe9e0321e9c62DB64857DD23C63dFD4";

  const contract = new ethers.Contract(contractAddress, aggregatorAbi, signer);

  // Follow this documentation (https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/code-examples/nodejs-backend/nodejs) to upload file via Lighthouse SDK
  // Transaction details
  const data_url = "https://gateway.lighthouse.storage/ipfs/bafkreia4ruswe7ghckleh3lmpujo5asrnd7hrtu5r23zjk2robpcoend34";
  const fileLinkBytes = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data_url));
  
  const submit = await contract.submit(fileLinkBytes, ethers.utils.hexlify(ethers.utils.toUtf8Bytes("")), 0, 0, 0, {
    gasLimit: 50_000_000,
  });

  const response = await submit.wait();
  console.log("transaction done");

  const eventData = response.events[0].args;
  // Assuming there is only one event in the response, you can access it like this:
  
  // Assuming the event has three parameters: bytes, uint256, and address
  const fileLinkHex = eventData[0];
  const fileLinkByte = ethers.utils.arrayify(fileLinkHex);
  const uint256Data = eventData[1];
  const addressData = eventData[2];

  // Now you can work with the event data as needed
  console.log('File Link', ethers.utils.toUtf8String(fileLinkByte));
  console.log('File Id:', uint256Data);
  console.log('File Id in Number:', Number(uint256Data));
  console.log('User Address:', addressData);
};

submit()
