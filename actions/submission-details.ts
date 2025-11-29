'use server'
import { getServerSession } from "next-auth";
import {prisma} from "@/lib/prisma"
import {options} from '@/auth'
export async function submission_details(submissionId:string) {
  const session = await getServerSession(options);
  if (!session || !session.user?.id) throw new Error("Unauthorized");
  const userId=session.user.id;  
  const submission=prisma.submission.findFirst({
    where:{
        id:submissionId
    }
  })
  return submission
}