import { Schema, model, Document } from "mongoose";

// Define the schema for a product
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

// Define the Product model using the schema
export const Product = model<ProductDocument>("Product", productSchema);

// TypeScript interface for a product document
export interface ProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
}
