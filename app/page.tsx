import Image from "next/image";

export default function Home() {
  return (
    <div className='bg-slate-900 min-h-screen text-white '>
      <div className='flex justify-center pt-32 text-7xl font-bold text-gray-300 px-52'>
        Your AI Career Coach for
      </div>
      <div className='flex justify-center text-6xl font-bold text-gray-300 px-52'>
        Professional Success
      </div>

      <div className='flex justify-center pt-6 text-2xl text-gray-500 px-52'>
        Advance your career with personalized guidance, interview
      </div>
      <div className='flex justify-center text-2xl text-gray-500 px-52'>
        prep, and AI-powered tools for job success.
      </div>
    </div>
  );
}
