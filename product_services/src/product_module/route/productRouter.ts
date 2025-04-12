import { Router } from "express";
import {
  validateCreateProduct,
  validateUpdateProduct,
  validateDeleteProduct,
} from "../../validation/productValidator";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/create", validateCreateProduct, createProduct);
router.put("/update", validateUpdateProduct, updateProduct);
router.delete("/delete/:id", validateDeleteProduct, deleteProduct);

export const productRouter = router;
