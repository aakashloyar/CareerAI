'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
 } from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 import { quizType } from "@/lib/validation"
 import { Button } from "@/components/ui/button"
 import { useState } from "react"
 type newquizType=Pick<quizType,"id"|"createdAt"|"name"|"count"|"type">
 
 type SideProps = {
    quiz: newquizType | null;
    topics:{value:string}[];
  };
  
 export function Side({ quiz, topics }: SideProps) {
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    console.log(quiz);
    return (
        <div className='w-full'>
            <Card>
                <CardHeader>
                    <CardTitle className="underline flex "># {quiz?.name}</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>
                <CardContent>
                    <div className='flex'>
                        <div className='font-bold px-1'>Topics: </div>
                        <div className='flex flex-wrap gap-2'> 
                            {topics.map((topic) => (
                                <div key={topic.value} className=' bg-slate-200 rounded hover:bg-slate-300 p-1'>
                                   # {topic.value}
                                
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className='flex'>
                        <div className='font-bold px-1'>Number of questions: </div>
                        <div> {quiz?.count}</div>
                    </div>
                </CardContent>
                <CardFooter>
                    {/* <Button variant="outline">Start</Button> */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                            <div className='bg-black text-white py-2 px-4 rounded-lg'>Start</div>
                           {/* //<Button>Start</Button> */}
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Enter the details</DialogTitle>
                            </DialogHeader>
                            {/* <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription> */}
                            <div> 
                               <CardWithForm onClose={handleClose}/>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </div>
    )
}
export function List() {
    return (
        <div className='pt-14 flex justify-center '>
            <div className='w-full px-2'>
                <Table>
                    <TableCaption>A list of your recent Quizes</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>No of Questions</TableHead>
                        <TableHead>Topics</TableHead>
                        <TableHead className="text-right">Created On</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">name</TableCell>
                                <TableCell>count</TableCell>
                                <TableCell>topic</TableCell>
                                <TableCell className="text-right">date</TableCell>
                            </TableRow> 
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
export function CardWithForm({ onClose }: { onClose: () => void }) {
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Please enter the Alloted time</CardTitle>
          {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Time</Label>
                <Input id="name" placeholder="In sec" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" onClick={onClose}>Start</Button>
        </CardFooter>
      </Card>
    )
}
  