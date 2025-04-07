"use client"

import { useRouter } from 'next/navigation';
import Coverletterform from '@/components/coverletter/form'
import {Button} from '@/components/ui/button'
export default function() {
    const router=useRouter()
    const backClick=()=>{
        router.push('/ai-cover-letter')
    }
    return (
            <div className='px-2 bg-slate-800 min-h-screen text-white pt-20 '>
               <div>
                <Button variant="link" onClick={backClick} className="text-white">⬅️ Back to cover-letters</Button>
               </div>
               <div className="px-4">
                <div className='px-4'>
                  <div className='text-2xl md:text-5xl font-bold pt-3'>
                    Create Cover Letters
                  </div>
                  <div className='text-sm pt-1'>
                    Generate a tailored cover letter for your job application
                  </div>
                </div>
                
                <div className='flex flex-center pt-8 px-8'>
                  <Coverletterform/>
                </div>
               </div>
               
              
            </div>
            
    )
}