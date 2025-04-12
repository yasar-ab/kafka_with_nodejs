import mongoose from "mongoose";
const dbUrl = process.env.DB_URL || "";
export const dbConnection = () => {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};
