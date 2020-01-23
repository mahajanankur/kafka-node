const { topics } = require("config").get("kafka");
const rpcQueueAdmin = topics.rpcQueueAdmin;
const { publish } = require("../kafka/producer");

exports.kafkaAsRestClient = async (json) => {
    console.log(`Publishing data to topic: ${rpcQueueAdmin}: `, json);
    publish(json, rpcQueueAdmin);
}