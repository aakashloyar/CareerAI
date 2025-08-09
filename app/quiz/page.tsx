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
import {Quiz} from "@/app/quiz/_components/listtable";
import {New} from "@/app/quiz/_components/new"
export type qlisttype=Pick<quizType,'name'|'count'|'createdAt'|'id'|'type'|'topics'>;

export default async function() {
    const session=await getServerSession(options);
    const fetch=async():Promise<qlisttype[]>=> {
        try{
            if(!session ||!session.user||!session.user.id) return[];       
            const rawQuizs = await prisma.quiz.findMany({
                where: {
                  userId: session.user.id,
                },
                select: {
                  id: true,
                  name: true,
                  count: true,
                  createdAt: true,
                  type: true,
                  topics: {
                    select: {
                      topic: {
                        select: {
                          value: true,
                        },
                      },
                    },
                  },
                },
                orderBy: {
                  createdAt: 'desc',
                },
              });
              
              // Flatten topic array
            const quizs = rawQuizs.map((quiz) => ({
                ...quiz,
                topics: quiz.topics.map((t) => t.topic), // topic: [{ value: 'Math' }, ...]
            }));
            return quizs;
        }
        catch(err) {
            console.error(err);
            return [];
        }
        
    }
    const qlist=await fetch();
    console.log(qlist);
    return (
      <div className='pt-14'>
        <div className='mt-14 grid grid-cols-10'>
          <div className='col-span-8 flex justify-center m-4 border-4 border-t-8 rounded-xl border-gray-300'>
              <div className='w-full'>
                  <div className='bg-slate-300 rounded p-1'>
                    Your Quizes
                  </div>
                  <Table>
                      <TableCaption>A list of your recent Quizes</TableCaption>
                      <TableHeader>
                          <TableRow className="">
                          <TableHead className="">Name</TableHead>
                          <TableHead className="">Tags</TableHead>
                          <TableHead className="">Created On</TableHead>
                          <TableHead>No of Questions</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {qlist.map((quiz)=>(
                              <Quiz quiz={quiz} key={quiz.id}/>
                          ))}
                      </TableBody>
                  </Table>
              </div>
          </div>
          <div className='m-4 col-span-2  border-4 border-t-8 border-gray-300 rounded h-min'>
            <div className='bg-slate-300 rounded p-1'>
              Create Quiz
            </div>
            <div className='h-full flex justify-center items-center m-4'>
              <New/>
            </div>
          </div>
        </div>
      </div>
    )
}
