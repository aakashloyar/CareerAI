'use client'
import Button from '@/components/WhiteButton'
import { useRouter } from "next/navigation";

export default function() {
    const router = useRouter();

    const handleClick=()=>{
        router.push("/ai-cover-letter/new");
    }
    return (
        <div className='px-8 bg-slate-800 min-h-screen text-white pt-20 '>
            <div className='flex justify-between items-center border-b-2 border-white'>
                <div className='text-2xl md:text-4xl font-bold '>
                    My Cover Letters
                </div>
                <div className=''>
                    <Button label={'Create New'} handleClick={handleClick}/>
                </div>
            </div>

        </div>
    )
}