'use client'
import { queOptType } from "@/lib/validation"
export default function Each({each}:{each:queOptType}) {
    console.log("***")
    console.log(each)
    return (
        <div className=''>
            <div className='border-4 rounded-xl p-4'>
                <div className='text-xl font-bold'>
                    Q1. {each.value}
                </div>
                <div className='flex flex-col'>
                    {each.options.map((option)=>(
                        <Option key={option.id} />
                    ))}
                </div>
            </div>
        </div>
    )
   
}
export function Option() {
    return (
        <div>
            <div className='rounded-xl border p-4 my-4 bg-red-200 font-semibold'>A</div>
        </div>
    )
}
