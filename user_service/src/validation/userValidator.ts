import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Define the schema for creating a user
const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Define the schema for updating a user
const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

// Define the schema for deleting a user (assumes ID is required)
const deleteUserSchema = Joi.object({
  id: Joi.string().uuid().required(), // Assuming user ID is UUID
});

// Middleware for creating a user
export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};

// Middleware for updating a user
export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};

// Middleware for deleting a user
export const validateDeleteUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = deleteUserSchema.validate(req.params); // Assuming delete action uses params for ID
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }
  next();
};
