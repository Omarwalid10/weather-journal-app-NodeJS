// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
/* Express to run server and routes */
const express = require("express");

/* Start up an instance of app */
const server = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
server.use(cors());

// Initialize the main project folder
server.use(express.static("website"));

// open server in port 5000
server.listen(5000, listening);
function listening() {
  console.log(` ####  server running on localhost in port: 5000  ####`);
}
//setup the post request and save its body in projectData
server.post("/add_weather", (req, res) => {
  console.log(" ###  the post req is done  ###");
  projectData.push(req.body);
});
//setup the get request and send the data to the app again
server.get("/get_weather", function (req, res) {
  //for send the last obj in the projectData array
  const i = projectData.length - 1;
  res.send(projectData[i]);
  console.log(" ###  the get req is done  ###");
});
