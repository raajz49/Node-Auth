import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/usermodel.js";

const protect =asyncHandler(async(req,res,next)=>{
let token;


 // Retrieve token from cookies
token= req.cookies.jwt;

if(token){
    try{
        //verifytoken
        const  decoded=jwt.verify(token,process.env.JWT_SECRET);
        
        //find user corresp.. to the token decoded
        const user = await User.findById(decoded.userId).select('-password');

        // Set the user on the request object
        req.user = user;

        next();
        
    }catch(error){
        res.status(401);
        throw new Error('Not Authorized,invalid token ');
    }
}else{
    res.status(401);
    throw new Error('Not Authorized,no token ');
}
})

export { protect };