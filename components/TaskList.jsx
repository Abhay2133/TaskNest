"use client";
import React, { useEffect, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/redux/slices/taskSlice";
import TaskCard from "./TaskCard";

const TaskMemo = memo(({ task }) => (
  <TaskCard {...task} />
));

const TaskList = ({ filter, sortOrder, searchTerm }) => {
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

  let filteredTasks = tasks.filter((task) => {
    if (filter === "Important") return task.important;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  filteredTasks.sort((a, b) => {
    const dateA = new Date(a.scheduledDate);
    const dateB = new Date(b.scheduledDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  if (searchTerm.trim() !== "") {
    filteredTasks = filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const visibleTasks = filteredTasks.slice(0, visibleCount);

  return (
    <section className="p-4 border-y border-gray-300 h-[50%] shadow-md overflow-auto">
      <h2 className="text-xl font-semibold text-[#644DA2] mb-3">Tasks</h2>

      {error ? (
        <p className="text-red-500 text-center text-lg">{error}</p>
      ) : visibleTasks.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">No tasks found.</p>
      ) : (
        visibleTasks.map((task) => <TaskMemo key={task._id} task={task} />)
      )}
    </section>
  );
};

export default TaskList;
