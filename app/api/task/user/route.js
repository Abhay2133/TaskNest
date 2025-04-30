import { connectDB } from "@/lib/db";
import { verifyToken } from "@/middleware/auth";
import { getUserTasks } from "@/controllers/taskController";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
        await connectDB()
        const user=verifyToken(req)
        const tasks=await getUserTasks(user.userId)
        return NextResponse.json({tasks},{status:200});
    }
    catch(err){
        return NextResponse.json({message:err.message},{status:500})
    }
}