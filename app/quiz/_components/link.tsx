'use client'
import {Button} from "@/components/ui/button"
import { useRouter } from "next/navigation";
export function Link_Quiz({id}:{id:string}) {
    const router=useRouter();
    return (
        <div className=''>
            <Button variant='link' onClick={()=>{
                router.push(`/quiz/${id}`)
            }}>
                Enter
            </Button>
        </div>
    )
}
export function Link_Submission({id}:{id:string}) {
    const router=useRouter();
    return (
        <div className=''>
            <Button variant='link' onClick={()=>{
                router.push(`/submission/${id}`)
            }}>
                Enter
            </Button>
        </div>
    )
}