import mongoose from 'mongoose';

const connectDB = async () => {
    const MONGODB_URI = "mongodb+srv://user123:user123@cluster0.kltgqdg.mongodb.net/sales_Inventory?retryWrites=true&w=majority&appName=Cluster0";

    try {
        if (mongoose.connections[0].readyState) {
            return true;
        }
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully');
        return true;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        return false;
    }
};

export default connectDB; 