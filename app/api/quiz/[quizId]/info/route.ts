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
export async function GET(req: Request,  { params }:PageProps) {
  const session=await getServerSession(options);
  if(!session ||!session.user||!session.user.id) return NextResponse.json({error:"login first"},{status:400});         
  const {quizId} = await params;
  if (!quizId) {
    return NextResponse.json({ error: 'quizId is required' }, { status: 400 });
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id:quizId },
  });

  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }

  return NextResponse.json(quiz);
}
