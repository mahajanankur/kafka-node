const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("config");

//Custom Imports
const subscribers = require("./src/services/subscribers");
const pocController = require("./src/controllers/poc");

//Custom properties
const { port, profile } = config.get("server");

//Constant Variables
// const profile = "dev";
// const port = 8080;

//Configure the server
const server = express();

//Configure the rest api logger

server.use(morgan(profile));

//Configure the JSON body parser for request.
server.use(bodyParser.json());

//Server port configuration.
server.listen(port, () => {
    console.log(`Kafka service node server is running on port: ${port}`);
});

//Register the controllers as routers.
server.use("/api", pocController);