'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CalendarDays, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask } from '@/redux/slices/taskSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddTask = () => {
    const dispatch = useDispatch();
    // const { loading } = useSelector((state) => state.tasks);
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    const [showCalendar, setShowCalendar] = useState(false);

    const onSubmit = async (data) => {
        console.log(data)
        try {
            setLoading(true)
            await dispatch(addNewTask(data)).unwrap();
            setLoading(false)
            reset();
        } catch (error) {
            console.error('Task Add Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white/70 p-4 shadow-md space-y-3 rounded-sm flex flex-col border border-blue-200'>
            <div className='flex space-x-5 bg-white/35 w-full xl:w-[100%] relative'>
                <div className='w-[90%]'>
                    {/* title  */}
                    <input
                        type="text"
                        {...register('title', { required: 'Title is required' })}
                        className='w-full px-3 p-2 text-gray-800 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 text-lg border border-gray-300 shadow-md focus:outline-0'
                        placeholder='Add task'
                    />
                    {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
                </div>
                <div className='xl:absolute right-10 xl:px-2'>
                    {/* calendar */}
                    <button
                        type="button"
                        onClick={() => setShowCalendar(!showCalendar)}
                        className='text-black cursor-pointer active:scale-105 duration-150 hover:text-blue-500'
                    >
                        <CalendarDays size={30} />
                    </button>
                    {showCalendar && (
                        <div className="absolute  top-12 text-gray-900 right-0 bg-white z-10 px-4 p-2 text-lg shadow-lg rounded">
                            <Controller
                                control={control}
                                name="scheduledDate"
                                defaultValue={new Date()}
                                render={({ field }) => (
                                    <DatePicker
                                        selected={field.value}
                                        onChange={(date) => { field.onChange(date); setShowCalendar(!showCalendar) }}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15} // 15 minutes gap
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()} // today ke pehle nahi choose kar sakte
                                        
                                    />
                                )}

                            />
                        </div>
                    )}
                </div>
            </div>

            <div className='flex flex-col w-full 2xl:w-[100%] xl:flex-row bg-white/30 space-x-5 relative'>
                <div className='w-[100%] xl:w-[90%]'>
                    {/* description */}
                    <textarea
                        {...register('description')}
                        className='w-full px-2 border border-gray-300 shadow-md rounded-md focus:ring-2 focus:ring-blue-400 text-gray-500  h-[100px] focus:outline-0'
                        placeholder='Description'
                    />
                </div>

                <div className='md:absolute bottom-0 right-0 p-2'>
                    {/* add button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex space-x-0.5 rounded-lg bg-[#9A77FC] py-2 justify-center items-center opacity-[79%] px-4 text-gray-900 cursor-pointer active:scale-105 duration-150 hover:bg-[#9A77FC] ${loading ? 'opacity-50' : ''}`}
                    >
                        <span><Plus /></span>
                        <span>{loading ? 'Adding...' : 'Add'}</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddTask;
