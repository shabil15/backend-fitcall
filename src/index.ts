import { httpServer } from "./infrastructure/config/app";
import connectDB from "./infrastructure/config/connectDB";
import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT || 3000;

const start = () => {
  httpServer.listen(PORT, () => {
    connectDB();
    console.log(`Server connected to http://localhost:${PORT}`);
  });
}

start();
