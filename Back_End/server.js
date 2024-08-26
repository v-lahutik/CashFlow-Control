import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routers/users.router.js';
import { connectToDB } from './utils/database.js';


dotenv.config();
const app=express();

//database connection
connectToDB();

//middlewares
app.use(express.json())
app.use(cors())

//routers
app.use('/users', userRouter);

//error handlers
app.use((req, res, next) => {
    next(createError("Route not found!", 404));
  });
  
app.use((err, req, res, next) => {
    if (err) {
      res.status(err.status || 500).json({ msg: err.message });
    }
  });


//server
const port = process.env.PORT || 5000;
app.listen(port, console.log(`server is up on port: ${port} 🚀`));