const { KafkaClient, Consumer, ConsumerGroup } = require("kafka-node");
const { host, port } = require("config").get("kafka");

const kafkaHost = `${host}:${port}`;

const kafkaConsumer = ({ topics, options }) => {
    const client = new KafkaClient({ kafkaHost });
    const consumer = new Consumer(client, topics, options);
    let top = JSON.stringify(topics);
    consumer.on('error', (error) => {
        console.log(`Error while creating consumer for topic ${top} `, error);
    });
    // console.log(`Kafka consumer is ready for topic ${top}: `, JSON.stringify(options));
    return consumer;
};

module.exports = { kafkaConsumer }