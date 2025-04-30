"use client";
import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/redux/slices/taskSlice";
import TaskCard from "./TaskCard";

const TaskMemo = memo(({ task }) => (
  <TaskCard {...task} />
));

const CompleteTaskList = () => {
  const dispatch = useDispatch();
  const { tasks, error } = useSelector((state) => state.tasks);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        setVisibleCount((prev) => prev + 5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const completedTasks = tasks.filter((task) => task.completed);
  const visibleTasks = completedTasks.slice(0, visibleCount);

  return (
    <div className="border-t p-2 h-[30%] overflow-auto">
      <h2 className="text-xl text-green-600 mb-2">Completed Tasks</h2>

      {error ? (
        <p className="text-red-500 flex justify-center text-2xl">{error}</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-600 flex justify-center text-2xl">No tasks found.</p>
      ) : completedTasks.length === 0 ? (
        <p className="text-gray-500">No tasks completed yet.</p>
      ) : (
        visibleTasks.map((task) => <TaskMemo key={task._id} task={task} />)
      )}
    </div>
  );
};

export default CompleteTaskList;
