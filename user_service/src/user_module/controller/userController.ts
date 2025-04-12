import { Request, Response } from "express";
import {
  createNewUser,
  updateUserById,
  findUser,
  findUserById,
  removeUser,
} from "../service/userServices";
import { errorFormatter } from "../../utils/errorFormatter";

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await createNewUser(req.body);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};

// Update User
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUserById(req.body);
    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};

// Get All Users
export const getUser = async (req: Request, res: Response) => {
  try {
    const users = await findUser();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};

// Get User by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await removeUser(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};
