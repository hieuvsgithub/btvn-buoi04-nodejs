import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({});

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(MONGO_URI);
    console.log(`connected Mongoose:${connected.connection.host}`);
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
