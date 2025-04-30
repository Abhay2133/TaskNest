import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { verifyToken } from "@/middleware/auth";
import { NextResponse } from "next/server";
import { createTask } from "@/controllers/taskController";
import { use } from "react";


export async function POST(req) {
    try{
        await connectDB()
        console.log("check point 1")
        const user=verifyToken(req)
        const body= await req.json()
        const task=await createTask(user.userId,body)
        return NextResponse.json({task},{status:201})
    }
    catch(err){
        return NextResponse.json({message:err.message},{status:500});
    }
}