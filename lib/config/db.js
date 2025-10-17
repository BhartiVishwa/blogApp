import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI,
     { serverSelectionTimeoutMS: 10000,
     socketTimeoutMS: 45000,}
    );
    console.log(" Connected with MongoDB");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
  }
};
