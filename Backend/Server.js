import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './Routes/userRoutes.js'
import { notFound,errorHandler } from './Middleware/errorMiddleware.js';
import connectDB from './Config/db.js';

dotenv.config()

connectDB();

const port=process.env.PORT || 5000;
const app=express();




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users',userRoutes)

app.get('/',(req,res)=>res.send('Server is ready'))

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>
    console.log(`Server started on port ${port}`));

