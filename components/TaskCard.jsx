import React, { useState } from 'react';
import { LucideStar, Edit, Trash, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import {
  deleteTask,
  toggleComplete,
  updateTask,
  toggleImportant
} from '@/redux/slices/taskSlice';

const TaskCard = ({ _id, title, description, scheduledDate, completed, important }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title, description, scheduledDate });

  const handleEdit = () => {
    dispatch(updateTask({ id: _id, updates: form }));
    setEditMode(false);
  };

  const handleCheck = () => {
    dispatch(toggleComplete({ id: _id, completed: !completed }));
  };

  const handleImportant = () => {
    dispatch(toggleImportant({ id: _id, important: !important }));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(_id));
    }
  };

  return (
    <div className={`relative flex items-start p-4 bg-white/50 border-b border-gray-300 rounded-lg shadow-sm ${completed ? 'opacity-60' : ''}`}>
      {/* Checkbox */}
      <div className='absolute top-4 left-3'>
        <input
          type="checkbox"
          className='w-5 h-5 text-blue-500 cursor-pointer'
          checked={completed}
          onChange={handleCheck}
        />
      </div>

      {/* Content */}
      <div className='ml-10 w-full pr-24 flex flex-col gap-2'>
        <h2 className={`text-xl font-medium ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {title}
        </h2>

        <p className='text-sm text-gray-600'>
          {scheduledDate ? new Date(scheduledDate).toLocaleString('en-IN', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false
          }) : 'No date set'}
        </p>

        <p className='text-sm text-gray-500 max-h-[70px] overflow-y-auto'>{description}</p>
      </div>

      {/* Action Icons */}
      <div className='absolute top-3 right-3 flex items-center gap-3'>
        <button onClick={handleImportant} className='text-yellow-500 hover:text-yellow-600 active:scale-110 duration-150'>
          {important ? <Star size={20} fill='currentColor' /> : <LucideStar size={20} />}
        </button>
        <button onClick={() => setEditMode(true)} className='text-gray-700 hover:text-blue-600 active:scale-110 duration-150'>
          <Edit size={20} />
        </button>
        <button onClick={handleDelete} className='text-gray-700 hover:text-red-500 active:scale-110 duration-150'>
          <Trash size={20} />
        </button>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <div className='fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50'>
          <div className="bg-white/80 text-gray-900 p-6 rounded-xl shadow-md w-[90%] sm:w-[400px] lg:w-[40%] xl:w-[35%]">
            <h3 className='text-lg font-semibold mb-4'>Edit Task</h3>
            <input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 rounded-md bg-white/60 focus:ring-2 focus:ring-blue-500 mb-3"
              placeholder="Title"
            />
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full p-2 rounded-md bg-white/60 focus:ring-2 focus:ring-blue-500 mb-3"
              placeholder="Description"
            />
            <input
              type="datetime-local"
              value={new Date(form.scheduledDate).toISOString().slice(0, 16)}
              onChange={e => setForm({ ...form, scheduledDate: e.target.value })}
              className="w-full p-2 rounded-md bg-white/60 focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className='flex justify-end gap-3'>
              <button onClick={handleEdit} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition active:scale-105'>
                Save
              </button>
              <button onClick={() => setEditMode(false)} className='bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md transition active:scale-105'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
