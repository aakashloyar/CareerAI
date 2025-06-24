// components/TakeClient.tsx
'use client'

import { useEffect } from "react"
import { useQuestionStore } from "@/store/questionStore"
import { queOptType } from "@/lib/validation"

export default function TakeClient({questions}:{questions:queOptType[]}) {
  const setQuestions = useQuestionStore((state) => state.setQuestions)

  useEffect(() => {
    setQuestions(questions)
    console.log(questions)
  }, [questions, setQuestions])

  return (
    <div>
      
    </div>
  )
}
