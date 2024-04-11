import generateToken from "../utils/generateToken.js";

import AsyncHandler from "express-async-handler"
import User from "../models/usermodel.js";
//@desc  Auth user/set token
//route  POST /api/users/auth
//@access Public

const authUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ error: 'Invalid email or password' });
    }
  });
  

//@desc  Register a new user
//route  POST /api/users
//@access Public

const registerUser=AsyncHandler(async (req,res)=>{
    // const { name } =req.body;
    // console.log(req.body);

    const { name,email,password }= req.body;
   
    const userExists=await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exist');
    }

    const user=await User.create({
        name,
        email,
        password
    });
    if(user){
        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
    res.status(200).json({message:'Register User'}) 
});



    //@desc  Logout user
//route  POST /api/users/logout
//@access Public

const logoutUser=AsyncHandler(async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'User Logoutss'}) 
});



    //@desc  Get user profile
//route  GET /api/users/profile
//@access private

const getUserProfile=AsyncHandler(async (req,res)=>{
  const user={
    _id:req.user._id,
    email:req.user.email,
    password:req.user.password
  }
    res.status(200).json({user}) 
});


//@desc Update user profile
//route  PUT /api/users/profile
//@access Private

const UpdateUserProfile=AsyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email|| user.email;
        
        if(req.body.password){
            user.password=req.body.password;
        }
       const UpdatedUser= await user.save();
       res.status(200).json({
        _id:UpdatedUser._id,
        name:UpdatedUser.name,
        email:UpdatedUser.email

       });
       
    }else{
        res.status(404);
        throw new Error('user not found')
    }

    res.status(200).json({message:'Update the user profile'}) 
});


export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    UpdateUserProfile
}