"use client"
import Rechart from './_components/rechart'
import { Button } from "@/components/ui/button"
import { createQuiz } from '@/actions/create-quiz'
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState,useEffect } from 'react' 
import { quizSchema } from "@/lib/validation"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';
const topicCountSchema = quizSchema.pick({
    topic: true,
    count: true,
});
export default function TabsDemo() {
    const router=useRouter();
    const { toast } = useToast()
    const [details, setDetails] = useState({
        topic:"",
        count:0,
    });
    const handleClick=(async()=>{
        //console.log(details.topic);
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
            if(formatted.topic?._errors?.[0]) {
                console.log("topic");
                toast({
                    title: "Topics: Error",
                    description:formatted.topic?._errors?.[0],
                })
            }
            return;
        }
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
            console.log(is);
            router.push(`/quiz/${is}`);

        }
        return;
    })
  return (
    <div className='flex justify-center pt-20'>
        <Tabs defaultValue="account" className="w-3/4">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="new">New Quiz</TabsTrigger>
            </TabsList>
            <TabsContent value="analysis">
                <Card>
                <CardHeader>
                    <CardTitle>Analysis</CardTitle>
                    <CardDescription>
                       Analyse your past exam here.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <Rechart/>
                    </div>
                </CardContent>
                <CardFooter>
                    {`Average Score=20%`}
                </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="new">
                <Card className=''>
                    <CardHeader>
                        <CardTitle>AI-powered Quiz</CardTitle>
                        <CardDescription>
                        Challenge yourself with our AI-powered quiz — personalized, smart, and always fresh!
                        </CardDescription>
                    </CardHeader>
                    <form action={handleClick}>
                        <CardContent className="space-y-2">
                            
                            <div>
                                <InputBar/>
                            </div>
                            <div className='flex'>
                                <div className="space-y-1">
                                <Label htmlFor="no">Number of questions</Label>
                                <Input id="no" onChange={(e)=>setDetails({...details, count:parseInt(e.target.value)})}type="number" />
                                </div>
                                
                                <div className='pl-3'>
                                    <div>
                                        <Label htmlFor="type">Type of Questions</Label>
                                    </div>
                                    <div className='pt-1'>
                                        <select className="px-0.5 py-1.5 rounded-sm bg-slate-50 border" id="type" name="type">
                                            <option value="single">Single Correct</option>
                                            <option value="multi">Multi Correct</option>
                                            <option value="both">Both </option>
                                        </select>
                                    </div>
                                    
                                </div>
                            </div>
                           
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Generate</Button>
                        </CardFooter>
                    </form>
                </Card>
            </TabsContent>
        </Tabs>
    </div>    
  )
}
export function InputBar() {
    const [topics,setTopics ]=useState<Set<string>>(new Set());
    const [inputValue, setInputValue] = useState('');
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
          //console.log('Entered topic:', inputValue);
          console.log('inside')
          let newTopic=new Set(topics);
          newTopic.add(inputValue);
          //console.log(newTopic)
          setTopics(newTopic);
          //console.log(topics)
          setInputValue('');
        }
    };
    useEffect(()=>{
        console.log(topics.size)
    },[topics])
    const handleClick=(topic:string)=>{
        let newTopics = new Set(topics)
        newTopics.delete(topic)
        setTopics(newTopics);  
    }
    return (
        <div className='w-2/3'>
            <div >
            </div>
            <div>
                <Label htmlFor="topic">Topics</Label>
                <div>
                   
                    <div className='border'>
                        <div className='px-2 pb-10'>
                            {[...topics].map((topic)=>(
                                <div key={topic} className=' max-w-min flex justify-between bg-slate-300'>
                                    <div className='px-1 pt-1'>{topic}</div>
                                    <div className='pt-0 font-bold'>
                                       <button type="button" onClick={() => handleClick(topic)}>x</button>
                                    </div>
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