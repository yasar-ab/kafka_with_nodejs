import { Router } from "express";
import {
  createOrder,
  updateOrder,
  getOrders,
  getOrderById,
  deleteOrder,
} from "../controller/orderController";
import {
  validateCreateOrder,
  validateUpdateOrder,
  validateDeleteOrder,
} from "../../validation/orderValidator"; // Import the validation middleware

const router = Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/create", validateCreateOrder, createOrder);
router.put("/update", validateUpdateOrder, updateOrder);
router.delete("/delete/:id", validateDeleteOrder, deleteOrder);

export const orderRouter = router;
