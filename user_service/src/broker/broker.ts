import { Consumer, Kafka, Partitioners, Producer, logLevel } from "kafkajs";
import {
  MessageBrokerType,
  MessageHandler,
  MessageType,
  OrderEvent,
  TOPIC_TYPE,
} from "./broker.type";
import dotenv from "dotenv";
dotenv.config();
const clientId = process.env.CLIENT_ID || "";
const groupId = process.env.GROUP_ID || "";
const brokers = [process.env.KAFKA_BROKER || "kafka:9092"];

const kafka = new Kafka({
  clientId: clientId,
  brokers: brokers,
  logLevel: logLevel.INFO,
});

let producer: Producer;
let consumer: Consumer;

const createTopic = async (topic: string[]) => {
  try {
    const topics = topic.map((t) => ({
      topic: t,
      numPartitions: 1,
      //   replicationFactor:1 // based on available brokers
    }));

    const admin = kafka.admin();
    await admin.connect();
    const topicExist = await admin.listTopics();
    console.log(topicExist);

    for (const item of topics) {
      if (!topicExist.includes(item.topic)) {
        await admin.createTopics({
          topics: [item],
        });
      }
    }
    await admin.disconnect();
  } catch (error) {
    console.error(`Error creating topic: ${error}`);
  }
};

const connectProducer = async <T>(): Promise<T> => {
  try {
    await createTopic(["OrderEvents"]);
    if (producer) {
      console.log("producer already connected with existing connection");
      return producer as T;
    }
    producer = kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
    await producer.connect();
    console.log("producer connected with a new connection");
    return producer as T;
  } catch (error) {
    console.error(`Error creating producer: ${error}`);
    throw error;
  }
};

const disconnectProducer = async () => {
  try {
    if (producer) {
      await producer.disconnect();
      console.log("producer disconnected");
    }
  } catch (error) {
    console.error(`Error disconnecting producer: ${error}`);
    throw error;
  }
};

const connectConsumer = async <T>(): Promise<T> => {
  try {
    if (consumer) {
      console.log("consumer already connected with existing connection");
      return consumer as T;
    }
    consumer = kafka.consumer({
      groupId: groupId,
    });
    await consumer.connect();
    console.log("consumer connected with a new connection");
    return consumer as T;
  } catch (error) {
    console.error(`Error creating consumer: ${error}`);
    throw error;
  }
};

const disconnectConsumer = async <T>() => {
  try {
    if (consumer) {
      await consumer.disconnect();
      console.log("consumer disconnected");
    }
  } catch (error) {
    console.error(`Error disconnecting consumer: ${error}`);
    throw error;
  }
};

//publish fuction

const publish = async (data: any) => {
  try {
    const producer = await connectProducer<Producer>();
    const result = await producer.send({
      topic: data.topic,
      messages: [
        {
          headers: data.headers,
          key: data.event,
          value: JSON.stringify(data.message),
        },
      ],
    });
    console.log("publishing result", result);
    return result.length > 0;
  } catch (error) {
    throw error;
  }
};

const subscribe = async (topic: TOPIC_TYPE, messageHandler: MessageHandler) => {
  try {
    const consumer = await connectConsumer<Consumer>();
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (topic !== "OrderEvents") {
          return;
        }
        if (message.key && message.value) {
          const inputMessage: MessageType = {
            headers: message.headers,
            event: message.key.toString() as OrderEvent,
            data: message.value ? JSON.parse(message.value.toString()) : null,
          };
          messageHandler(inputMessage);
          //to inform kafka  about offset because if any case  server failed kafka will retry message  with respect to offset
          await consumer.commitOffsets([
            {
              topic,
              partition,
              offset: (Number(message.offset) + 1).toString(),
            },
          ]);
        }
      },
    });
  } catch (error) {
    throw error;
  }
};

export const MessageBroker: MessageBrokerType = {
  publish,
  subscribe,
  disconnectProducer,
  disconnectConsumer,
  connectConsumer,
  connectProducer,
};
