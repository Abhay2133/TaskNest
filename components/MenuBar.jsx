"use client"
import React from 'react'
import { ListTodo } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/slices/authSlice'
import { Star } from 'lucide-react'
import { CheckSquareIcon } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'


const MenuBar = ({ filter, setFilter }) => {

  const dispatch=useDispatch()
  const router=useRouter()
  const handleLogout=()=>{
    dispatch(logout())
    router.push('/')
  }
  return (
    <div className='flex flex-col  p-1 w-full lg:p-3 md:w-[100%] lg:w-full relative overflow-hidden rounded-sm gap-4 h-[480px]'>
      <div className='  sm:w-full sm:mx-auto flex flex-col gap-5 lg:gap-2 h-[200px] rounded-lg  sm:p-2 bg-white/75 shadow'>
        {/* navigating throught the fillters */}
        <button onClick={() => setFilter("Pending")} className={`text-black justify-center  w-fit   flex space-x-2 active:scale-110 duration-150 gap-2 p-1 px-2 rounded-lg cursor-pointer hover:bg-[#EEEECE] ${filter === "Pending" ? "bg-blue-100 text-blue-900 font-semibold"
              : "hover:bg-blue-50 text-gray-800"
          }`}><span><ListTodo /></span><span className='font-light text-sm flex items-center'>Pending task</span></button>
        <button onClick={()=>setFilter("Important")} className={`text-black justify-center w-fit  flex space-x-2 active:scale-110 duration-150 gap-2 p-1 px-2 rounded-lg cursor-pointer hover:bg-[#EEEECE] ${filter === "Important" ? "bg-blue-100 text-blue-900 font-semibold"
              : "hover:bg-blue-50 text-gray-800"
          }`}><span><Star /></span><span className='font-light text-sm flex items-center'>Important</span></button>
        {/* <button className='text-black justify-center w-fit  flex space-x-2 active:scale-110 duration-150 gap-2 p-1 px-2 rounded-lg cursor-pointer hover:bg-[#EEEECE]'><span><CheckSquareIcon /></span><span className='font-light text-sm flex items-center'>Completed</span></button> */}
      </div>

      <div className="absolute bottom-4 left-0 w-full px-2">
        <div className="bg-white/70 backdrop-blur-md p-3 rounded-xl shadow">
          <button
          onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer active:scale-110 text-gray-800 hover:bg-red-50 hover:text-red-700 transition duration-150 w-full"
          >
            <LogOut size={18} />
            <span className="text-sm">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuBar 