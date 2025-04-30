import { connectDB } from "@/lib/db";
import { register } from "@/controllers/authCountroller";

export async function POST(req) {
    await connectDB()
    const body=await req.json()
    const fromData=await register(body)
    return new Response(JSON.stringify(fromData), { status: fromData.status });
}