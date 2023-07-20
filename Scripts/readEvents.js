const { ethers } = require('ethers');
const aggregatorAbi = require("../ABI/abi");
require("dotenv").config();

// Replace the following with your Ethereum node URL and contract address
const nodeUrl = "https://api.calibration.node.glif.io/rpc/v1";
const contractAddress = "0xAD978E56d3264673bA8705c1e7b2f00932345B1D";

// Create a new ethers provider with your Ethereum node URL
const provider = new ethers.providers.JsonRpcProvider(nodeUrl);

// Create an instance of the contract using the contract address and ABI
const contract = new ethers.Contract(contractAddress, aggregatorAbi, provider);

// Replace 'EventName' with the actual event name you want to listen for
const eventName = 'DataInfo';

// Function to read events from the smart contract
async function readEvents() {
  try {
    // Get the filter for the specified event
    const filter = contract.filters[eventName]();
    console.log("here");
    // Get the logs for the event using the filter
    const logs = await provider.getLogs(filter);
    console.log(logs);

    // Parse and process each log
    logs.forEach((log) => {
      const parsedLog = contract.interface.parseLog(log);
      console.log('Event data:', parsedLog.values);
    });
  } catch (error) {
    console.error('Error reading events:', error);
  }
}

// Call the function to read events
// readEvents();
module.exports = readEvents;
