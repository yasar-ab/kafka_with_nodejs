import { Router } from "express";
import {
  updateUser,
  createUser,
  deleteUser,
  getUser,
  getUserById,
} from "../controller/userController";
import {
  validateCreateUser,
  validateDeleteUser,
  validateUpdateUser,
} from "../../validation/userValidator";

const router = Router();

router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/create", validateCreateUser, createUser);
router.put("/update", validateUpdateUser, updateUser);
router.delete("/delete", validateDeleteUser, deleteUser);

export const userRouter = router;
