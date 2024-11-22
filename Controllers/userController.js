const asyncHandler = require("express-async-handler");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//get all contact
//
//@ route Get// api/contact- changes into api/users/register
//change get contacts into registeruser

const registerUser =asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email ||!password){
        res.status(400);
     throw new Error ("all are necessary")   
    };
    const userAvailable = await User.findOne({email});
    if (userAvailable){
        res.status(400);
        throw new Error  ("User already register");
    }
//hashed password
const hashPassword = await bcrypt.hash(password,10);
console.log("Hashed Password:", hashPassword);
const user = await User.create({
    username,
    email,
    password:hashPassword,
});
console.log('User created ${user}');
if (user){ 
    res.status(201).json({_id:user.id,email:user.email});
    return;
}else{
    res.status(400);
    throw new Error("User data is not valid")
}
    return res.json({message:"Register the user"})
});


//post/api/user/login
const loginUser =asyncHandler(async(req,res)=>{
    const {email,password}= req.body;
    if(!email||!password){
        res.status(400);
        throw new Error(" email and password are mandatory")
    };
    const user = await User.findOne({email});
    //compare password with hash password
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECERT,
        {expiresIn:"1d"}
    );
        res.status(200).json({accessToken});
        return;
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    };
});

//post/api/user/current
//acces private
const currentUser =asyncHandler(async(req,res)=>{
    const user=req.user
    res.json({message:" current user",
        user,
    })
});


module.exports = {registerUser,loginUser,currentUser};