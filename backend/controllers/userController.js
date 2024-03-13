import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const authUser = asyncHandler(async(req,res)=>{
   const {email,password}=req.body;

   const user=await User.findOne({email});
   if(user && (await user.matchPassword(password))){
    const token=jwt.sign({userId:user._id},process.env.
     JWT_SECRET,{
        expiresIn:'30d'
     })
    
     res.cookie('jwt',token,{
        httpOnly:true,
        secure:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'strict',
        maxAge:30 * 24 * 60 * 60 * 1000,
     })
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    })
   }else{
    res.status(401)
    throw new Error('Invalid email or password')
   }
});

const registerUser = asyncHandler(async(req,res)=>{
    res.send('register user')
 });

 const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    });
    res.status(200).json({message:'Logged out successfully'})
 });

 const getUserProfile = asyncHandler(async(req,res)=>{
    res.send('get user user')
 });

 const updateUserProfile = asyncHandler(async(req,res)=>{
    res.send('update user user')
 });

 const getUsers = asyncHandler(async(req,res)=>{
    res.send('get user')
 });

 const getUserById = asyncHandler(async(req,res)=>{
    res.send('get user by id')
 });

 const deleteUser = asyncHandler(async(req,res)=>{
    res.send('delete user')
 });

 const updateUser = asyncHandler(async(req,res)=>{
    res.send('update user')
 });

export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}



