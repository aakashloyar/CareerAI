'use client'

import { useParams } from 'next/navigation'
import Each from "../../../_components/each"
import { useQuestionStore } from "@/store/questionStore"

type RouteParams = {
  quizId: string
  problemId: string
}

export default function Problem() {
  const { quizId, problemId } = useParams() as RouteParams
  const questions = useQuestionStore((state) => state.questions)
  console.log(questions)
  return (
    <div>
      <h2>Quiz ID: {quizId}</h2>
      <Each each={questions[Number(problemId)]} />
    </div>
  )
}
