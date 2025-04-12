import { Request, Response } from "express";
import {
  createNewProduct,
  updateProductById,
  findProduct,
  findProductById,
  removeProduct,
} from "../service/productServices";
import { errorFormatter } from "../../../utils/errorFormatter";

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await createNewProduct(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await updateProductById(req.body);
    if (!updatedProduct) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};

// Get All Products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await findProduct();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};

// Get Product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await findProductById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await removeProduct(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: errorFormatter(error),
    });
  }
};
