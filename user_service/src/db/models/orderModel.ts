import { Schema, model, Document } from "mongoose";

// Define the schema for an order
const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true, default: "pending" },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Define the Order model using the schema
export const Order = model<OrderDocument>("Order", orderSchema);

// TypeScript type for an order document
export interface OrderDocument extends Document {
  orderNumber: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: string;
  orderDate: Date;
}
