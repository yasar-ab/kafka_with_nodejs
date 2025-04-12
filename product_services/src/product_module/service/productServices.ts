import { MessageType } from "../../broker/broker.type";
import { Product } from "../../db/models/productModel";

// Create a new product
export const createNewProduct = async (productData: any) => {
  try {
    const existingProduct = await Product.findOne({
      name: productData.name,
    });
    if (existingProduct) {
      throw new Error("Product already exists");
    }
    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw error;
  }
};

// Update product by ID
export const updateProductById = async (productData: any) => {
  try {
    const existingProduct = await Product.findOne({
      name: productData.name,
      _id: { $ne: productData._id },
    });
    if (existingProduct) {
      throw new Error("Details already exists with  other product");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productData._id,
      productData,
      {
        new: true,
      }
    );
    if (!updatedProduct) return null;
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

// Get all products
export const findProduct = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
};

// Get a product by ID
export const findProductById = async (id: string) => {
  try {
    const product = await Product.findById(id);
    if (!product) return null;
    return product;
  } catch (error) {
    throw error;
  }
};

// Delete a product by ID
export const removeProduct = async (id: string) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return null;
    return deletedProduct;
  } catch (error) {
    throw error;
  }
};

export const HandleSubscription = async (message: MessageType) => {
  console.log("Message received by order Kafka consumer", message);

  // if (message.event === OrderEvent.ORDER_UPDATED) {
  // call create order
};
