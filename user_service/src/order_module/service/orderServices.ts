import { MessageType } from "../../broker/broker.type";
import { SendCreateOrderMessage } from "../../broker/brokerSerivces";
import { Order } from "../../db/models/orderModel";

// Create a new order
export const createNewOrder = async (orderData: any) => {
  try {
    const existingProduct = await Order.findOne({
      orderNumber: orderData.orderNumber,
    }).sort({ orderNumber: -1 });
    if (existingProduct) {
      throw new Error("Order already exists");
    }
    const newOrder = new Order(orderData);
    await newOrder.save();
    await SendCreateOrderMessage(newOrder);
    return newOrder;
  } catch (error) {
    throw new Error(`Error creating order: ${error}`);
  }
};

// Update an order by ID
export const updateOrderById = async (orderData: any) => {
  try {
    const existingProduct = await Order.findOne({
      orderNumber: orderData.orderNumber,
      _id: { $ne: orderData._id },
    }).sort({ orderNumber: -1 });
    if (existingProduct) {
      throw new Error("Order already exists");
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      orderData._id,
      orderData,
      {
        new: true,
      }
    );
    if (!updatedOrder) return null;
    return updatedOrder;
  } catch (error) {
    throw new Error(`Error updating order: ${error}`);
  }
};

// Get all orders
export const findOrders = async () => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    throw new Error(`Error fetching orders: ${error}`);
  }
};

// Get an order by ID
export const findOrderById = async (id: string) => {
  try {
    const order = await Order.findById(id);
    if (!order) return null;
    return order;
  } catch (error) {
    throw new Error(`Error fetching order by ID: ${error}`);
  }
};

// Delete an order by ID
export const removeOrder = async (id: string) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return null;
    return deletedOrder;
  } catch (error) {
    throw new Error(`Error deleting order: ${error}`);
  }
};

export const HandleSubscription = async (message: MessageType) => {
  console.log("Message received by order Kafka consumer", message);

  // if (message.event === OrderEvent.ORDER_UPDATED) {
  // call create order
};
