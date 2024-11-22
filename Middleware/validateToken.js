const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = async(req,res,next)=>{
    try{
let token;
let authHeader = req.headers.Authorization || req.headers.authorization;

if(authHeader&& authHeader.startsWith("Bearer")){
    token = authHeader.split(" ")[1];

    jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(err,decoded)=>{
console.log(err)
       if(err){
        res.status(401);
        
    throw new Error("User id not authorized");
       };
 console.log(decoded)
       req.user = decoded.user;
       next();
       
    });
    if(!token){
        res.status(401);
        throw new Error("User is not authorized or token not given")
    }
}
console.log(validateToken)
    }catch(err){
        console.log(err)
       return res.status(500).json({
            msg:err.message
        })
    }
}

module.exports = validateToken;