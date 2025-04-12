import { User } from "../../db/models/userModel";

export const createNewUser = async (userData: any) => {
  try {
    const existingUser = await User.findOne({
      email: userData.email,
    }).sort({ _id: -1 });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

// Update user by ID
export const updateUserById = async (userData: any) => {
  try {
    const existingUser = await User.findOne({
      email: userData.email,
      _id: { $ne: userData._id },
    }).sort({ _id: -1 });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const updatedUser = await User.findByIdAndUpdate(userData._id, userData, {
      new: true,
    });
    if (!updatedUser) return null;
    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
};

// Get all users
export const findUser = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};

// Get a user by ID
export const findUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) return null;
    return user;
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error}`);
  }
};

// Delete a user by ID
export const removeUser = async (id: string) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return null;
    return deletedUser;
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
};
