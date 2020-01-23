const { topics } = require("config").get("kafka");

const { publish } = require("../kafka/producer");
const { kafkaConsumer } = require("../kafka/consumer");
const RestClient = require("../utils/RestClient");

//Kafka Topics
const pubsub = topics.pubsub;
const restclient = topics.restclient;
// const contentSourceTopic = "contentSourceTopic";

//Subscriber for pubsub
let contentSourceTopicConsumer = kafkaConsumer({ topics: [{ topic: pubsub }], options: {} });
contentSourceTopicConsumer.on('message', async (message) => {
    let value = JSON.parse(message.value);
    console.log("First Consumer : Consumed message :", value);
    // let result = await saveOrUpdate(value);
    console.log("Consumed message processed :", result);
});

//Subscriber for rpcQueueAdmin
// let rpcQueueAdminConsumer = kafkaConsumer({ topics: [{ topic: rpcQueueAdmin }], options: { autoCommit: false } });
let rpcQueueAdminConsumer = kafkaConsumer({ topics: [{ topic: restclient }], options: {} });
rpcQueueAdminConsumer.on('message', async (message) => {
    let value = JSON.parse(message.value);
    console.log("Consumer : Consumed message :", value);
    let client = new RestClient();
    let result = null;
    try {
        result = await client.get(value.url, value.headers);
        // console.log("Consumed message processed :", result);
        console.log("Consumed message processed successfully.");
        // console.log("KafkaConsumer :", rpcQueueAdminConsumer);
        // rpcQueueAdminConsumer.commit();
    } catch (error) {
        console.error("Error in consuming from topic restclient :", error);
        // throw new Error(`Error in consuming from topic rpcQueueAdmin `, error);

        //Publish back to same topic.
        setTimeout(function () {
            if (value.retry) {
                value.retry = value.retry + 1;
            } else {
                value.retry = 1;
            }
            publish(value, restclient);
        }, 30000);
    }
    // finally {
    //     rpcQueueAdminConsumer.close();
    // }
});