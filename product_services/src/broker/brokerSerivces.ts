import { Consumer, Producer } from "kafkajs";
import { MessageBroker } from "./broker";
import { OrderEvent } from "./broker.type";
import { HandleSubscription } from "../product_module/service/productServices";

export const initializeBroker = async () => {
  try {
    console.log("inside initializeBroker");
    const producer = await MessageBroker.connectProducer<Producer>();
    producer.on("producer.connect", () => {
      console.log("Producer connected");
    });
    const consumer = await MessageBroker.connectConsumer<Consumer>();
    consumer.on("consumer.connect", () => {
      console.log("Consumer connected");
    });
    await MessageBroker.subscribe("OrderEvents", HandleSubscription);
  } catch (error) {
    console.error(`Error initializing broker: ${error}`);
  }
};

//Create order
export const SendCreateOrderMessage = async (data: any) => {
  await MessageBroker.publish({
    event: OrderEvent.CREATE_ORDER,
    topic: "OrderEvents",
    headers: {},
    message: data,
  });
};

//Cancel order
export const SendOrderCanceledMessage = async (data: any) => {
  await MessageBroker.publish({
    event: OrderEvent.CANCEL_ORDER,
    topic: "OrderEvents",
    headers: {},
    message: data,
  });
};
