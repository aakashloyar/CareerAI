"use client"

import Image from "next/image";
import Card from '@/components/card'
import UnCard from '@/components/uncard'
import { useSession } from "next-auth/react";
export default function Home() {
  const session = useSession();
  return (
    <div className='bg-slate-900 min-h-screen text-white '>
       <div className=' flex justify-center pt-32 text-xl text-gray-300 px-52'>
          {/* {JSON.stringify(session.data?.user?.name)} */}
          {JSON.stringify(session.data)}
      </div>

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
      <div className='flex justify-center pt-32 px-44'>
        <img src="/hompgimg.png" className='w-full' alt="Carrer Image" />
      </div>

      <div className='flex justify-center pt-32 text-3xl font-bold text-gray-100 px-52'>
        Powerful feature for your carrer growth
      </div>
      <div className='flex justify-center pt-8'>
        <div className='px-3'>
          <Card heading={'AI-Powered Career Guidance'} subheading={'Get personalized career advice and insights powered by advanced AI technology.'} imglink={'/img1.png'}/>
        </div>
        <div className='px-3'>
          <Card heading={'Interview Preparation'} subheading={'Practice with role-specific questions and get instant feedback to improve your performance.'} imglink={'/img2.png'}/>
        </div>
        <div className='px-3'>
          <Card heading={'Smart Resume Creation'} subheading={'Generate ATS-optimized resumes with AI assistance.'} imglink={'/img3.png'}/>
        </div>
      </div>
      <div className='w-full bg-slate-800 mt-20'>
        <div className='text-center font-bold text-2xl pt-20'>
          How It Works
        </div>
        <div className='text-center text-sm text-gray-400 pt-4'>
          Four simple steps to accelerate your career growth
        </div>

        <div className='flex justify-center pt-8'>
          <div className='px-3'>
            <UnCard heading={'Professional Onboarding'} subheading={'Share your industry and expertise for personalized guidance'} imglink={'/img4.png'}/>
          </div>
          <div className='px-3'>
            <UnCard heading={'Craft Your Documents'} subheading={'Create ATS-optimized resumes and compelling cover letters'} imglink={'/img5.png'}/>
          </div>
          <div className='px-3'>
            <UnCard heading={'Prepare for Interviews'} subheading={'Practice with AI-powered mock interviews tailored to your role'} imglink={'/img6.png'}/>
          </div>
          <div className='px-3'>
            <UnCard heading={'Track Your Progress'} subheading={'Monitor improvements with detailed performance analytics'} imglink={'/img7.png'}/>
          </div>
        </div>

      </div>
     
    </div>
  );
}
