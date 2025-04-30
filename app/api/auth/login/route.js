import { connectDB } from "@/lib/db";
import { login } from "@/controllers/authCountroller";

export async function POST(req) {
    await connectDB()
    const body=await req.json();
    const result=await login(body)
    return new Response(JSON.stringify(result), { status: result.status });

}