import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Define the schema for creating an order
const createOrderSchema = Joi.object({
  orderNumber: Joi.string().required(),
  userId: Joi.string().required(), // Assuming userId is a UUID
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(), // Assuming productId is a UUID
        quantity: Joi.number().min(1).required(),
        price: Joi.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
  totalAmount: Joi.number().min(0).required(),
  status: Joi.string()
    .valid("pending", "processing", "completed", "cancelled")
    .required(),
  orderDate: Joi.date().required(),
});

// Define the schema for updating an order
const updateOrderSchema = Joi.object({
  productId: Joi.string().uuid(),
  quantity: Joi.number().min(1),
  customerId: Joi.string().uuid(),
});

// Define the schema for deleting an order (assumes ID is required)
const deleteOrderSchema = Joi.object({
  id: Joi.string().uuid().required(), // Assuming order ID is UUID
});

// Middleware for creating an order
export const validateCreateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createOrderSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};

// Middleware for updating an order
export const validateUpdateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateOrderSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};

// Middleware for deleting an order
export const validateDeleteOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = deleteOrderSchema.validate(req.params); // Assuming delete action uses params for ID
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};
