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
import { newSumbission } from "@/actions/quiz-actions";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 import { quizType } from "@/lib/validation"
 import { Button } from "@/components/ui/button"
 import { useState } from "react"
 import { useRouter } from "next/navigation";
import { string } from "zod";
 type newquizType=Pick<quizType,"id"|"createdAt"|"name"|"count"|"type">
 
 type SideProps = {
    quiz: newquizType;
    topics:{value:string}[];
  };
  
 export function Start_Quiz({ quiz, topics }: SideProps) {
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    console.log(quiz);
    return (
      <div className="w-full">
        <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
          {/* Header */}
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">
              {quiz?.name}
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-4">
            {/* Topics */}
            <div>
              <div className="font-semibold text-slate-700 mb-2">Topics:</div>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <span
                    key={topic.value}
                    className="bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full border border-slate-300 hover:bg-slate-200 transition-colors"
                  >
                    #{topic.value}
                  </span>
                ))}
              </div>
            </div>

            {/* Question count */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Number of questions:</span>
              <span className="text-slate-600">{quiz?.count}</span>
            </div>
          </CardContent>

          {/* Footer with Start Button */}
          <CardFooter className="flex justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-2 rounded-lg shadow">
                  Start
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-xl max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-slate-800">
                    Enter your details
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <CardWithForm onClose={handleClose} id={quiz?.id} />
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>

    )
}
export function CardWithForm({ onClose,id }: { onClose: () => void, id:string}) {
  const [time, setTime] = useState<string>("");
  const router=useRouter();

  // Button disabled if no input or input <= 60
  const isDisabled = time===""||parseInt(time) < 60;
  const handleClick=(async()=>{
      const result = await newSumbission(id,parseInt(time));
      if(!result.id) return;
      router.push(`/quiz/take/${id}/${result.id}`);
  })
  return (
    <Card className="w-[350px]  ">
      <CardHeader>
        <CardTitle>Please enter the Allotted time</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="time">Time</Label>
              <Input
                type="text"
                value={time}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && !["Backspace","Delete","ArrowLeft","ArrowRight","Tab"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => setTime(e.target.value)}
                placeholder="In sec"
                className="border rounded p-2 w-40"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" onClick={handleClick} disabled={isDisabled}>Start</Button>
      </CardFooter>
    </Card>
  );
}