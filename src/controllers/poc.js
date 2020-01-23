const express = require("express");
const { topics } = require("config").get("kafka");
//Custom Imports
const { Response } = require("../dto/generic");
const { kafkaAsRestClient } = require("../services/poc");

//Get router from express
const router = express.Router();

//Resources
router.get("/status", async (req, res, next) => {
    console.log("Service status request.");
    let response = new Response(true, "Service is running!!");
    return res.json(response);
});

router.get("/rest/client", async (req, res, next) => {
    // console.log("Param: ", req.params.id);
    let json = {
        url: "http://localhost:3333/api/admin/status",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let response = await kafkaAsRestClient(json);
    res.json(response);
});

router.get("/rest/client2", async (req, res, next) => {
    let json = {
        url: "http://localhost:3333/api/admin/campaign/1",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let response = await kafkaAsRestClient(json);
    res.json(response);
});

//Make sure to export the router otherwise below error would be thrown 
//TypeError: Router.use() requires a middleware function but got a Object
module.exports = router;