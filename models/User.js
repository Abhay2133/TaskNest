import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
},{timestamps:true});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);
export default User;