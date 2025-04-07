import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/juice`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    return conn.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default connectDB;