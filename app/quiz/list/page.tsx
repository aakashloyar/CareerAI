import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {prisma} from '@/lib/prisma'
import { getServerSession } from "next-auth";
import {options} from '@/auth'
import { quizType } from "@/lib/validation";
import {Link_Quiz} from "@/app/quiz/_components/link"
export default async function() {
    const session=await getServerSession(options);
    type qlisttype=Pick<quizType,'name'|'count'|'topic'> &{id:string} &{createdAt:Date};
    const fetch=async():Promise<qlisttype[]>=> {
        try{
            if(!session ||!session.user||!session.user.id) return[];       
            const coverLetters = await prisma.quiz.findMany({
                where:{
                    userId:session.user.id
                },
                select:{
                    id:true,
                    name:true,
                    count:true,
                    topic:true,
                    createdAt:true
                },
                orderBy:{
                    createdAt:"desc"
                }
            })
            return coverLetters;
        }
        catch {
            return [];
        }
        
    }
    const qlist=await fetch();
    return (
        <div className='pt-14 flex justify-center '>
            <div className='w-full px-2'>
                <Table>
                    <TableCaption>A list of your recent Quizes</TableCaption>
                    <TableHeader>
                        <TableRow className="">
                        <TableHead className="">Name</TableHead>
                        <TableHead className="w-[500px]">Tags</TableHead>
                        <TableHead className="">Created On</TableHead>
                        <TableHead>No of Questions</TableHead>
                        <TableHead className="">Route</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {qlist.map((quiz)=>(
                            <TableRow key={quiz.id} className="">
                                <TableCell className="font-medium">{quiz.name}</TableCell>
                                <TableCell>{quiz.topic}</TableCell>
                                <TableCell className="">{quiz.createdAt.toISOString().split("T")[0]}</TableCell>
                                <TableCell>{quiz.count}</TableCell>
                                <TableCell className="">
                                    <Link_Quiz id={quiz.id}/>
                                </TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
