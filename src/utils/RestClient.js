const fetch = require("node-fetch");
class RestClient {

    async get(url, headers) {
        console.log("RestClient get request: ", url, headers);
        // TODO - Check Header type first
        // headers = headers ? JSON.parse(headers) : { 'Content-Type': 'application/json' };
        let response = await fetch(url, {
            method: 'get',
            headers,
        });
        return response;
    }

    async post(url, body, headers) {
        console.log("RestClient post request: ", url, body, headers);
        // TODO - Check Header type first
        // headers = headers ? JSON.parse(headers) : { 'Content-Type': 'application/json' };
        let response = await fetch(url, {
            method: 'post',
            body: JSON.stringify(body),
            headers,
        });
        return response;
    }
}

module.exports = RestClient;