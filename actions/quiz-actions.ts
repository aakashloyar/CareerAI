'use server'
import { getServerSession } from "next-auth";
import {prisma} from "@/lib/prisma"
import {options} from '@/auth'
export async function quiz_details(quizId: string) {
  const session = await getServerSession(options);
  if (!session || !session.user?.id) throw new Error("Unauthorized");
  const userId=session.user.id;  
  const quiz=await prisma.quiz.findFirst({
    where:{
        id:quizId
    },
    select:{
        id:true,
        type:true,
        count:true,
        name:true,
    }
  })
  return quiz;
}


export async function quiz_questions(quizId: string) {
  const session = await getServerSession(options);
  if (!session || !session.user?.id) throw new Error("Unauthorized");
  const userId=session.user.id;  
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
        isPicked: false,  // add default field
      })),
    }));

    return formatted;

}

export async function newSumbission(quizId: string, time: number) {
  const session = await getServerSession(options);
  if (!session || !session.user?.id) throw new Error("Unauthorized");
  const userId=session.user.id;  
  return await prisma.submission.create({
    data: {
        time,
        quizId,
        userId
    },
  });
}
export async function startQuiz(submissionId: string) {
  const session = await getServerSession(options);
  if (!session || !session.user?.id) throw new Error("Unauthorized");
  const userId=session.user.id;  
  return await prisma.submission.update({
    where: {
      id: submissionId,
    },
    data: {
      startedAt: new Date(), // sets to current time
    },
  });
}
export async function endQuiz(submissionId: string) {
  const session = await getServerSession(options);
  if (!session || !session.user?.id) throw new Error("Unauthorized");
  const userId=session.user.id;  
  return await prisma.submission.update({
    where: {
      id: submissionId,
    },
    data: {
      sumbittedAt: new Date(), // sets to current time
    },
  });
}