'use client'

import { useParams } from 'next/navigation'
import Each from "../../../_components/each"
import { useQuestionStore } from "@/store/questionStore"

type RouteParams = {
  submissionId: string
  problemId: string
}

export default function Problem() {
  const { submissionId, problemId } = useParams() as RouteParams
  const questions = useQuestionStore((state) => state.questions)
   // Wait for questions to load
   if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>
  }
  return (
    <div>
      {/* <h2>Quiz ID: {quizId}</h2> */}
      {/* <Each each={questions[Number(problemId)]} /> */}
    </div>
  )
}
