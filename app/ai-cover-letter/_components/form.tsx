"use client"
import InputBox from '@/components/DarkInputBox'
import { useState } from 'react'
import BigInputBox from '@/components/BigInputBox'
import {coverLetterSchema} from '@/lib/validation'
import {Button} from "@/components/ui/button"
import axios from 'axios'
import { useRouter } from 'next/navigation';
export default function() {
    const router = useRouter();
    const [details, setDetails] = useState({
        companyName: "",
        jobTitle: "",
        jobDescription: "",
        experience:"",
        skills:"",
        name:""
    });
    const [errors, setErrors] = useState<Record<string, string>>({}); 
    const  handleClick =async () => {
        setErrors({});
    
        const validatedData = coverLetterSchema.safeParse(details);
    
        if (!validatedData.success) {
            const formatted = validatedData.error.format();
    
            setErrors(prevErrors => ({
                ...prevErrors,
                companyName: formatted.companyName?._errors?.[0] || "",
                jobTitle: formatted.jobTitle?._errors?.[0] || "",
                jobDescription: formatted.jobDescription?._errors?.[0] || "",
                experience: formatted.experience?._errors?.[0] || "",
                name: formatted.name?._errors?.[0] || ""
            }));
            return;
        }
        try {
            const data=validatedData.data
            const res = await axios.post(
                "/api/cover-letter/new",
                {
                    data
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            alert("Cover Letter Genrated Successfully");
            router.push(`/ai-cover-letter/${res.data.message.id}`);

        } catch(err:any) {
            setErrors({ api: err.response?.data?.error || "Internal server Error" })
        }       
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
                    {errors.companyName && <div className="text-red-500 text-sm">{errors.companyName}</div>}
                </div>
                <div className='w-1/2 pl-4'>
                    <InputBox handleChange={(e)=>{
                        setDetails((prev) => ({ ...prev, jobTitle: e.target.value }));
                    }} label={'Job Title'} placeholder='SDE'/>
                    {errors.jobTitle && <div className="text-red-500 text-sm">{errors.jobTitle}</div>}
                </div>

            </div>
            <div className='flex justify-between  text-slate-900 pt-2'>
                <div className='w-1/2 pr-4'>
                   <InputBox handleChange={(e)=>{
                        setDetails((prev) => ({ ...prev, experience: e.target.value }));
                    }} label={'Experience'} placeholder='sde at xyz from jan-2023 to jan-2024'/>
                    {errors.experience && <div className="text-red-500 text-sm">{errors.experience}</div>}
                </div>
                <div className='w-1/2 pl-4'>
                    <InputBox handleChange={(e)=>{
                        setDetails((prev) => ({ ...prev, skills: e.target.value }));
                    }} label={'Skills'} placeholder='Java, Next.js'/>
                    {errors.skills && <div className="text-red-500 text-sm">{errors.skills}</div>}
                </div>
                
            </div>

            <div className='pt-6'>
                    <BigInputBox handleChange={(e)=>{
                        setDetails((prev) => ({ ...prev, jobDescription: e.target.value }));
                    }} label={'Description'} placeholder='Paste the job description'/>
                    {errors.jobDescription && <div className="text-red-500 text-sm">{errors.jobDescription}</div>}

            </div>
            <div className='flex justify-between pt-6 flex-wrap item-center'>
                <div className=''>
                   <InputBox handleChange={(e)=>{
                        setDetails((prev) => ({ ...prev, name: e.target.value }));
                    }} label={'Cover Letter Name'} placeholder='Unique name'/>
                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>
                <div className=''>
                    <Button variant="outline" onClick={handleClick} className="text-slate-900 bg-white">
                        Generate New Cover Letter
                    </Button>
                    {errors.api && <div className="text-red-500 text-sm">{errors.api}</div>}
                </div>
            </div>
        </div>
    )
}