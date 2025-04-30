import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { verifyToken } from "@/middleware/auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const user = verifyToken(req);

    const taskId = params?.id; // ✅ safe access

    if (!taskId) {
      return NextResponse.json({ message: "No task ID provided" }, { status: 400 });
    }

    const deleted = await Task.findOneAndDelete({
      _id: taskId,
      userId: user.userId,
    });

    if (!deleted) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });

  } catch (err) {
    console.error("Delete error:", err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const user = verifyToken(req);
    const taskId = params?.id;

    if (!taskId) {
      return NextResponse.json({ message: "No task ID provided" }, { status: 400 });
    }

    const body = await req.json();

    const updated = await Task.findOneAndUpdate(
      { _id: taskId, userId: user.userId },
      {
        ...(body.title && { title: body.title }),
        ...(body.description && { description: body.description }),
        ...(body.scheduledDate && { scheduledDate: body.scheduledDate }),
        ...(body.completed !== undefined && { completed: body.completed }),
        ...(body.important !== undefined && { important: body.important }),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ task: updated }, { status: 200 });

  } catch (err) {
    console.error("PATCH error:", err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}


