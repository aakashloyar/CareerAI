import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
 } from "@/components/ui/table"
 import { getServerSession } from "next-auth";
import {options} from '@/auth'
import {prisma} from '@/lib/prisma'
import {Start_Quiz} from "@/app/quiz/_components/start_quiz"
import {Link_Submission} from "@/app/quiz/_components/link"

interface PageProps {
    params: Promise<{
      id: string[];
    }>;
  }

export default async function Page({ params }: PageProps) {
    // Safely access params.id
    const par = await params;
    const Id=par.id.join('/');
    const fetchSubmissions = async (): Promise<Submission[]> => {
        const session = await getServerSession(options);
        try {
            if (!session || !session.user || !session.user.id) return [];       
            return await prisma.submission.findMany({
                where: {
                    userId: session.user.id,
                    quizId: Id
                },
                select: {
                    id: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        } catch {
            return [];
        }
    }

    const quiz = await prisma.quiz.findFirst({
        where: { id: Id },
        select: {
            id: true,
            name: true,
            type: true,
            createdAt: true,
            count: true,
        }
    });

    if (!quiz) {
        return <div>Quiz does not exist</div>;
    }

    const top_quiz = await prisma.quizTopic.findMany({
        where: { quizId: Id },
        select: { topicId: true }
    });

    const topicIds = top_quiz.map(t => t.topicId);
    const topics = await prisma.topic.findMany({
        where: { id: { in: topicIds } },
        select: { value: true },
    });

    const submissions = await fetchSubmissions();

    return (
        <div className='pt-14'>
            <div className='mt-14 grid grid-cols-12'>
                <div className='col-span-9 flex justify-center m-4 border-4 border-t-8 rounded-xl border-gray-300'>
                    <div className='w-full'>
                        <div className='bg-slate-300 rounded p-1'>Your Submissions</div>
                        <List submissions={submissions}/>
                    </div>
                </div>
                <div className='col-span-3 flex justify-center m-4 border-4 border-t-8 rounded-xl border-gray-300'>
                    <div className='w-full'>
                        <div className='bg-slate-300 rounded p-1'>Attempt</div>
                        <div className='p-0'>
                            <Start_Quiz quiz={quiz} topics={topics} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function List({ submissions }: { submissions: Submission[] }) {
    return (
        <div className='pt-14 flex justify-center'>
            <div className='w-full px-2'>
                <Table>
                    <TableCaption>A list of your recent submissions</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Alloted Time</TableHead>
                            <TableHead>SubmittedOn</TableHead>
                            <TableHead>Percentage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {submissions.map((submission) => (
                            <TableRow key={submission.id}>
                                <TableCell>{submission.createdAt.toISOString().split("T")[0]}</TableCell>
                                <TableCell>
                                    <Link_Submission id={submission.id}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

interface Submission {
    createdAt: Date;
    id: string;
}