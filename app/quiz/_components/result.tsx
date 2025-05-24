import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export function Result() {
    return (
        <div className='w-full'>
            <div className='w-full'>
                <Card className="">
                    <CardHeader>
                        <CardTitle className='flex justify-center underline text-xl'>Submission Analysis Quiz-1</CardTitle>
                        <CardDescription className='flex justify-center'></CardDescription>
                    </CardHeader>
                    <CardContent className='flex justify-around'>
                       <div className=''>
                        Submitted On 17 March 2025
                       </div>
                       <div>
                        8/10
                       </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">  
                    </CardFooter>
                </Card>
            </div>
            <div className='w-full px-4 pt-4'>
                <Each/>
            </div>
        </div>
    )
}
function Each() {
    return (
        <div className='border-4 rounded-xl p-4'>
            <div className='text-xl font-bold'>
                Q1. What is date today?
            </div>
            <div className='flex flex-col'>
                <Option/>
                <Option/>
                <Option/>
                <Option/>
            </div>
        </div>
    )
}
function Option() {
    return (
        <div>
            <div className='rounded-xl border p-4 my-4 bg-red-200 font-semibold'>A</div>
        </div>
    )
}
