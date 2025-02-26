"use client"
import InputBox from '@/components/DarkInputBox'
import { useState } from 'react'
import BigInputBox from '@/components/BigInputBox'
import Button from '@/components/WhiteButton'
export default function() {
    const [details, setDetails] = useState({
        companyName: "",
        jobTitle: "",
        description: "",
    });
    const handleClick=()=>{
        console.log('clicked')
    }
    return (
        <div className='border-2 border-white w-full rounded bg-slate-950 px-4 py-2'>
            <div className='text-xl font-semibold pt-2'>
                Job Details
            </div>
            <div className='text-sm'>
                Provide information about the position you're applying for
            </div>
            <div className='flex justify-between text-slate-900 pt-2'>
                <div className='w-1/2 pr-4'>
                    <InputBox handleChange={(e)=>{
                        setDetails((prev) => ({ ...prev, companyName: e.target.value }));
                    }} label={'Company Name'} placeholder='xyz'/>
                </div>
                <div className='w-1/2 pl-4'>
                    <InputBox handleChange={(e)=>{
                        setDetails((prev) => ({ ...prev, jobTitle: e.target.value }));
                    }} label={'Job Title'} placeholder='SDE'/>
                </div>

            </div>

            <div className='pt-6'>
                    <BigInputBox handleChange={(e)=>{
                        setDetails((prev) => ({ ...prev, description: e.target.value }));
                    }} label={'Description'} placeholder='Paste the job description'/>
            </div>
            <div className='flex justify-end pt-6'>
                <div>
                    <Button label={'Generate New Cover Letter'} handleClick={handleClick}/>
                </div>
            </div>
        </div>
    )
}