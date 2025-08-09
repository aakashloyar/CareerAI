import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import {options} from '@/auth'
interface PageProps {
    params: Promise<{
      submissionId: string
    }>,
    children:React.ReactNode
}
export async function GET(req: Request,  { params }:PageProps) {
  const session=await getServerSession(options);
  if(!session ||!session.user||!session.user.id) return NextResponse.json({error:"login first"},{status:400});         
  const {submissionId} = await params;
  if (!submissionId) {
    return NextResponse.json({ error: 'submissionId is required' }, { status: 400 });
  }

  const submission = await prisma.submission.findUnique({
    where: { id:submissionId },
    select:{
        
    }
  });

  if (!submission) {
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
  }
  return NextResponse.json(submission);
}
