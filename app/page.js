"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    const token=localStorage.getItem("token")
    if(token){
      router.push('/dashbord')
    }
  },[])

  const handleStart = () => {
    router.push("/login");
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex items-center justify-center px-6">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 max-w-6xl w-full">
        
        {/* Left Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 leading-tight">
            Organize Your Tasks Effortlessly
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Stay productive and in control with our intuitive task management app.
          </p>
          <button
            onClick={handleStart}
            className="bg-blue-600 text-white text-lg px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
          >
            Get Started
          </button>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/hero.png" // You need to place a file in `public/` folder like `public/task-illustration.png`
            alt="Task Management Illustration"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
