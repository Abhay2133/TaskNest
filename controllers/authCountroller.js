import User from "@/models/User";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

// registration of new user
export const register=async ({name,email,password})=>{
    try{

        const existing= await User.findOne({email});
        if(existing){
            return { status: 400, message: "User already exists" }
        }
        const hashPassword=await bcrypt.hash(password,10)
        const user=new User({name,email,password:hashPassword})
        await user.save()
        
        return {status:200,message:"Registraion success full"}
    }
    catch(err){
        console.log(err)
        return {status:500,message:"server error !"}
    }
}

// login

export const login=async ({email,password})=>{
    try{
        const user=await User.findOne({email})
        if(!user) return {status:401,message:"user not found"}
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch) return{status:401,message:"invalid email or password"}
        const token=jwt.sign({userId:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"1d"})
        console.log("token in contoller: ",token)
        return {
            status:201,
            message:"Login successful",
            token,
            user:{userId:user._id,name:user.name,email:user.email}
        }
    }
    catch(err){
        console.log(err)
        return {status:501,message:"server error"}
    }
}