import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://user123:user123@cluster0.kltgqdg.mongodb.net/sales_Inventory";
    console.log("Mongo URI:", uri);

    if (!uri) throw new Error("MONGODB_URI is not defined");

    if (mongoose.connection.readyState === 1) return;

    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
