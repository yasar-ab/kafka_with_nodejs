import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Define the schema for creating a product
const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  stockQuantity: Joi.number().required(),
  description: Joi.string().optional(),
});

// Define the schema for updating a product
const updateProductSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().min(3).max(50),
  price: Joi.number().min(0),
  category: Joi.string(),
  stockQuantity: Joi.number(),
  description: Joi.string().optional(),
});

// Define the schema for deleting a product (assumes ID is required)
const deleteProductSchema = Joi.object({
  id: Joi.string().uuid().required(), // Assuming product ID is UUID
});

// Middleware for creating a product
export const validateCreateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};

// Middleware for updating a product
export const validateUpdateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateProductSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};

// Middleware for deleting a product
export const validateDeleteProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = deleteProductSchema.validate(req.params); // Assuming delete action uses params for ID
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};
