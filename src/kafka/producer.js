'use strict';
const { KafkaClient, Producer } = require("kafka-node");
const { host, port } = require("config").get("kafka");

const kafkaHost = `${host}:${port}`;

const kafkaProducer = new Promise((resolve, reject) => {
    const client = new KafkaClient({ kafkaHost });
    const producer = new Producer(client, { requireAcks: 1 });

    producer.on('ready', () => {
        console.log("Kafka producer is ready.");
        resolve(producer);
    });

    producer.on('error', (err) => {
        console.error("Kafka producer error:  " + err);
        reject(err);
    });
});

const publish = async (message, topic, options = {}) => {
    try {
        console.log(`Publishing message to topic : ${topic}`);
        (await kafkaProducer).send([{ topic: topic, messages: JSON.stringify(message) }], (err, result) => {
            if (err)
                console.log(`Error publishing to topic:  ${topic}`, err);
            else
                console.log(`Message published to topic:  ${topic}`, result);
            //process.exit();
        });
    } catch (error) {
        console.log(`Error publishing to topic:  ${topic}`, err);
    }
}

module.exports = { kafkaProducer, publish };