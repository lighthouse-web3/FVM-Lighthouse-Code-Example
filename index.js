const express = require('express');
const app = express();
const port = 3000;
const StoreData = require("./Scripts/StoreData");
const readEvents = require("./Scripts/readEvents");
const getFileIdDetails = require("./Scripts/getFileIdDetails");

app.get('/', async (req, res) => {
  try {
    // Assuming StoreData() returns a promise
    // await StoreData();
    
    // console.log("waiting for 30 seconds");
    
    // Wait for 30 seconds using await
    await new Promise((resolve) => setTimeout(resolve, 30000));
    
    // Now, call the readEvents function
    //   readEvents();
      
      // Get Deal details
      getFileIdDetails();
    
    res.send('Hello, World!');
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

