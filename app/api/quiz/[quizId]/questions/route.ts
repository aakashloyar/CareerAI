import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import {options} from '@/auth'
interface PageProps {
  params: Promise<{
    quizId: string
  }>,
  children:React.ReactNode
}
export async function GET(req: Request,  { params }:PageProps ) {
  const session=await getServerSession(options);
  if(!session ||!session.user||!session.user.id) return NextResponse.json({error:"login first"},{status:400});       
  const {quizId}= await params;
  console.log(quizId)
  if(!quizId) return NextResponse.json({message:"invalid route"},{status:404});
  
  try {
    const rawQuestions = await prisma.question.findMany({
      where: {quizId},
      select: {
        id: true,
        type: true,
        value: true,
        options: {
          select: {
            option: {
              select: {
                id: true,
                value: true,
              },
            },
          },
        },
      },
    });

    const formatted = rawQuestions.map((q) => ({
      ...q,
      options: q.options.map((o) => ({
        ...o.option,
        true: false,  // add default field
      })),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
