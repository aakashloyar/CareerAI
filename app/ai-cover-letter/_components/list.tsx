"use client"
import {Button} from "@/components/ui/button"
import { useRouter } from 'next/navigation';
export default  function({id,company,title,createdOn,name}:props) {
    const router = useRouter();
    const handleClick=()=>{
        router.push(`ai-cover-letter/${id}`)
    }
    return (
        <div className='w-full border-2 border-white rounded-lg justify-center'>
            <div className='flex flex-wrap justify-between p-2 text-xl'>
                <div>
                    {name}
                </div>
                <div>
                    {company}
                </div>
                <div>
                    {title}
                </div>
                <div>
                    {createdOn.toISOString().split("T")[0]}
                </div>
                <div>
                    <Button variant="outline" onClick={handleClick} className="bg-white text-slate-900" >Open</Button>
                </div>
            </div>
        </div>
    )
}
interface props {
    id:string,
    company:string,
    title:string,
    createdOn:Date,
    name:string
}