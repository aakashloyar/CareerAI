"use client"

import BackLink from '@/components/BackButton';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form'
export default function() {
    const router=useRouter()
    const backClick=()=>{
        router.push('/ai-cover-letter')
    }
    return (
            <div className='px-8 bg-slate-800 min-h-screen text-white pt-20 '>
               <div>
                <BackLink label={'Back to cover-letters'} handleClick={backClick}/>
               </div>
               
               <div className='text-2xl md:text-5xl font-bold pt-3'>
                 Create Cover Letters
               </div>
               <div className='text-sm pt-1'>
                 Generate a tailored cover letter for your job application
               </div>
               <div className='flex flex-center pt-8 px-8'>
                <Form/>
               </div>
            </div>
            
    )
}