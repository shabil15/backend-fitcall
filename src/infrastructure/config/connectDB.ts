import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_string: string = process.env.MONGO_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_string)
    .then((data:any)=> console.log(`db connection on ${data.connection.host}`))
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
