import { app } from "./infrastructure/config/app";
import connectDB from "./infrastructure/config/connectDB";
import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;

const start = () => {
  app.get('/',(req,res)=> {
    res.send('hello')
  })

  app.listen(PORT,()=> {
    connectDB()
    console.log(`Server connected to http://localhost/${PORT}`);
  })
}

start();