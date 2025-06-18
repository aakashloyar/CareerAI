// app/quiz/[quizId]/take/page.tsx (Server Component)
import { prisma } from "@/lib/prisma"
import TakeClient from "../_components/takeclient" // 👈 the interactive component

interface PageProps {
  params: Promise<{
    quizId: string
  }>
}

export default async function TakePage({ params }: PageProps) {
  const {quizId}=await params
  console.log(quizId)
  let rawQuestions;
  try {
    rawQuestions = await prisma.question.findMany({
      where: { quizId:quizId },
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
    })
    console.log("***")
  } catch(err) {
    console.log("***")
    console.log(err)
  }
  
  // console.log(rawQuestions)
  // const questions = rawQuestions.map((q) => ({
  //   ...q,
  //   options: q.options.map((o) => o.option),
  // }))
  // console.log(questions)

  // return <TakeClient questions={questions} />
  return (
    <div>

    </div>
  )
}
