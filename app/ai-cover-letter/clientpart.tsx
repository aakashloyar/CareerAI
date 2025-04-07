"use client"
import {Button} from '@/components/ui/button'
import { useRouter } from 'next/navigation';
export default function Clientpart() {
    const router=useRouter();
    function handleClick(){
        router.push('/ai-cover-letter/new');
    }
    return (
        <div>
            <Button variant="outline" className="text-slate-900 font-semibold" onClick={handleClick}>
                Create New
            </Button>
        </div>
    )
}