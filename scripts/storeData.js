require("dotenv").config();
const { ethers } = require("ethers");
const aggregatorAbi = require("../abi/aggregatorABI");

const storeData = async () => {
  const provider = new ethers.providers.JsonRpcProvider("https://api.calibration.node.glif.io/rpc/v1");
  const privateKey = process.env.PRIVATE_KEY; //wallet private key
  const signer = new ethers.Wallet(privateKey, provider);

  const contractAddress = "0x467b08Ae34df6Bd00947555A308cFB935D8Ab06c";

  const contract = new ethers.Contract(contractAddress, aggregatorAbi, signer);

  // Transcation detail
  const fileLink = "https://gateway.lighthouse.storage/ipfs/bafkreia4ruswe7ghckleh3lmpujo5asrnd7hrtu5r23zjk2robpcoend34";
  const fileLinkBytes = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(fileLink));
  

  const storeData = await contract.storeData(fileLinkBytes, {
    gasLimit: 50_000_000,
  });

  const response = await storeData.wait()
  console.log(response);
  console.log("transaction done");

  if (response.events && response.events.length > 0) {
    // Assuming there is only one event in the response, you can access it like this:
    const eventData = response.events[0].args;
  
    // Assuming the event has three parameters: bytes, uint256, and address
    const bytesData = eventData[0];
    const uint256Data = eventData[1];
    const addressData = eventData[2];
  
    // Now you can work with the event data as needed
    console.log('File Link', bytesData);
    console.log('File Id:', uint256Data);
    console.log('File Id in Number:', Number(uint256Data));
    console.log('User Address:', addressData);
  } else {
    console.log('No events found in the transaction.');
  }
};

storeData()
