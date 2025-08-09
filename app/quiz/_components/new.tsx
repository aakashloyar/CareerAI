'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createQuiz } from '@/actions/create-quiz'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState ,useEffect} from 'react' 
import { quizSchema } from "@/lib/validation"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';
import { useTopicStore } from '@/store/topicStore';
type QuestionType = "single" | "multi" | "both";
const topicCountSchema = quizSchema.pick({
    topics:true,
    count: true,
    type:true
})
export function New() {
    const { topics,clearTopics} = useTopicStore();
    const router=useRouter();
    const { toast } = useToast()
    const [count, setCount] = useState<number>(0);
    const [type, setType] = useState<QuestionType>("single");
    useEffect(()=>{
        clearTopics();
    },[])
    const handleClick=(async()=>{
        console.log('hi***');
        //console.log(details.topic);
        const details={
            type,
            count,
            topics
        }
        console.log(details)
        // if(details!=null) {
        //     return;
        // }
        //return
        const validated=topicCountSchema.safeParse(details);
        if(!validated.success) {
            const formatted = validated.error.format();
            if(formatted.count?._errors?.[0]) {
                console.log("count");
                toast({
                    title: "No of Question: Error",
                    description:formatted.count?._errors?.[0],
                })
            }
            if(formatted.topics?._errors?.[0]) {
                console.log("topic");
                toast({
                    title: "Topics: Error",
                    description:formatted.topics?._errors?.[0],
                })
            }
            if(formatted.type?._errors?.[0]) {
                console.log("type");
                toast({
                    title: "Type: Error",
                    description:formatted.type?._errors?.[0],
                })
            }
            return;
        }
        console.log("***Reached at generating quiz")
        console.log(validated.data.topics)
        const is = await createQuiz(validated.data);
        if (!is) {
            toast({
                title: "Quiz: Error",
                description: "Error while creating quiz",
            });
        } else {
            toast({
                title: "Quiz: success",
                description: "Successfully created quiz",
            });
            console.log("****done");
            console.log(is);
            router.push(`/quiz/${is}`);

        }
        return;
    })  
    return (
        <Sheet>
        <SheetTrigger asChild>
            <Button variant="outline" className='bg-slate-900 text-white'>Create New Quiz</Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
            <SheetTitle>AI-powered Quiz</SheetTitle>
            <SheetDescription>
            Challenge yourself with our AI-powered quiz — personalized, smart, and always fresh!
            </SheetDescription>
            </SheetHeader>
            <form 
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent form submission on Enter key
                }
            }}
            onSubmit={(e) => {
                e.preventDefault();
                handleClick(); // Explicitly call handleClick
            }}>

                <CardContent className="space-y-2">
                    
                    <div>
                        <Topic/>
                    </div>
                    <div className='flex'>
                        <div className="space-y-1">
                        <Label htmlFor="no">Number of questions</Label>
                        <Input id="no" value={count} onChange={(e)=>setCount(parseInt(e.target.value||"0"))}type="number" />
                        </div>
                        <div className='pl-3'>
                            <div>
                                <Label htmlFor="type">Type of Questions</Label>
                            </div>
                            <div className='pt-1'>
                                <select className="px-0.5 py-1.5 rounded-sm bg-slate-50 border" value={type} onChange={(e)=>setType(e.target.value as QuestionType)} id="type" name="type">
                                    <option value="single">Single Correct</option>
                                    <option value="multi">Multi Correct</option>
                                    <option value="both">Both </option>
                                </select>
                            </div>
                            
                        </div>
                    </div>
                    
                </CardContent>
                <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose asChild>
                  <Button type="submit" >Generate</Button>
                </SheetClose>
                </SheetFooter>
                <CardFooter>
                    <Button type="submit" >Generate</Button>
                </CardFooter>
            </form>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Name</Label>
                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Username</Label>
                <Input id="sheet-demo-username" defaultValue="@peduarte" />
            </div>
            </div>
            <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
                <Button variant="outline">Close</Button>
            </SheetClose>
            </SheetFooter>
        </SheetContent>
        </Sheet>
    )
}


export default function() {
    
  return (
    <div className='flex justify-center pt-20'>
        <Card className='w-1/2'>
            <CardHeader>
                <CardTitle>AI-powered Quiz</CardTitle>
                <CardDescription>
                Challenge yourself with our AI-powered quiz — personalized, smart, and always fresh!
                </CardDescription>
            </CardHeader>
            <form 
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent form submission on Enter key
                }
            }}
            onSubmit={(e) => {
                e.preventDefault();
                handleClick(); // Explicitly call handleClick
            }}>

                <CardContent className="space-y-2">
                    
                    <div>
                        <Topic/>
                    </div>
                    <div className='flex'>
                        <div className="space-y-1">
                        <Label htmlFor="no">Number of questions</Label>
                        <Input id="no" value={count} onChange={(e)=>setCount(parseInt(e.target.value||"0"))}type="number" />
                        </div>
                        <div className='pl-3'>
                            <div>
                                <Label htmlFor="type">Type of Questions</Label>
                            </div>
                            <div className='pt-1'>
                                <select className="px-0.5 py-1.5 rounded-sm bg-slate-50 border" value={type} onChange={(e)=>setType(e.target.value as QuestionType)} id="type" name="type">
                                    <option value="single">Single Correct</option>
                                    <option value="multi">Multi Correct</option>
                                    <option value="both">Both </option>
                                </select>
                            </div>
                            
                        </div>
                    </div>
                    
                </CardContent>
                <CardFooter>
                    <Button type="submit" >Generate</Button>
                </CardFooter>
            </form>
        </Card>
    </div>    
  )
}

export function Topic() {

    const { topics, addTopic, deleteTopic} = useTopicStore();
    const [inputValue, setInputValue] = useState('');
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
          addTopic(inputValue);
          setInputValue('');
        }
    };
    const handleClick=(topic:{value:string})=>{
        let newTopics = new Set(topics)
        newTopics.delete(topic)
        deleteTopic(topic.value);
    }
    return (
        <div className='w-2/3'>
            <div >
            </div>
            <div>
                <Label htmlFor="topic">Topics</Label>
                <div>
                   
                    <div className='border'>
                        <div className='pb-10 pt-1 flex flex-wrap gap-2'>
                            {[...topics].map((topic)=>(
                                <div key={topic.value} className=' max-w-min flex-col bg-slate-200 rounded hover:bg-slate-300'>
                                    <div className='pt-0  flex justify-end text-xs font-bold text-red-700'>
                                       <button type="button" onClick={() => handleClick(topic)}>x</button>
                                    </div>
                                    <div className='pl-0.5 pr-4 text-xs'>{topic.value}</div>
                                    
                                </div>
                            ))}
                        </div>
                        <div className="space-y-1">
                            <Input id="topic" type="text" 
                                value={inputValue}          
                                onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                                onKeyDown={handleKeyDown}
                                placeholder="Type and press Enter"
                            />

                        </div>
                        
                    </div>
                </div>     
            </div>
        </div>
    )
}