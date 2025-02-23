import {useRouter} from 'next/navigation'
export default function BottomWarning({label,blabel,link}:BottomWarningP) {
    const router=useRouter();
    return (
        <div className=''>
            <div className='flex justify-center'>
                <div className='text-md'>
                    {label}
                </div>
                <div className='px-1'>
                    <button className="underline"
                        onClick={()=>{
                            router.push(link);
                        }}
                    
                    >{blabel}</button>
                </div>
            </div>
        </div>
    )
}

interface BottomWarningP {
    label: string;
    blabel:string,
    link:string
}
