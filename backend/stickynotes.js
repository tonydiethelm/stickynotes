//import everything needed
const express = require('express');

//set up constants
const app = express();
const port = 3000

//set up HTTP methods

//run on port
app.listen(port, () => {
    console.log(`stickynotes app Back End listening on port ${port}`)
  })