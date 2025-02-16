import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute=async (req,res,next)=>{
  try{
    const token=req.cookies.jwt;
    if(!token){
      return res.status(401).json({error:"Unauthorized access"});
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    if(!decoded){
      return res.status(401).json({error:"Unauthorized access"});
    }

    const user=await User.findById(decoded.userId).select("-password");

    if(!user){
      return res.status(401).json({error:"Unauthorized access"});
    }

    req.user=user;
    next();

  }catch(error){
    console.log("Error in protect route middleware",error.message);
    res.status(401).json({error:error.message});
  }
}

export default protectRoute;