import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import taskRoute from './routes/task.routes.js';

const mongodb_url=process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use(taskRoute);



const start=async()=>{
    const connectiontodb=await mongoose.connect(mongodb_url);
    console.log("connect to DB 😊🎉");
app.listen(8000,()=>{
    console.log("App is running to port 8000 👌🎉🎊🎇");
})
}


start();
