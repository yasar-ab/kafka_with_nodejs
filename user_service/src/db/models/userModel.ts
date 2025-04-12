import mongoose, { Schema, Document } from "mongoose";

// Define User schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Define User model
export const User = mongoose.model<UserDocument>("User", userSchema);

// TypeScript interface for user document
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}
