import { Request, Response } from "express";
import {
  createNewOrder,
  updateOrderById,
  findOrders,
  findOrderById,
  removeOrder,
} from "../service/orderServices";
import { errorFormatter } from "../../utils/errorFormatter";

// Create Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await createNewOrder(req.body);
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};

// Update Order
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await updateOrderById(req.body);
    if (!updatedOrder) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }
    res.json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};

// Get All Orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await findOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};

// Get Order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await findOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};

// Delete Order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await removeOrder(req.params.id);
    if (!deletedOrder) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};
