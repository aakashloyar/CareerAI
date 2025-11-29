'use client'

import { useParams } from 'next/navigation'
import Each from "../../../../_components/each"
import { useQuestionStore } from "@/store/questionStore"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
type RouteParams = {
  quizId: string
  submissionId: string
  problemId: string
}

export default function Problem() {
  const router=useRouter();
  const { quizId,submissionId, problemId } = useParams() as RouteParams
  const questions = useQuestionStore((state) => state.questions)
   // Wait for questions to load
   if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>
  }
  const goToProblem = (newId: number) => {
    router.push(`/quiz/take/${quizId}/${submissionId}/problem/${newId}`);
  };

  return (
    <div>
      <div>
        <Each each={questions[Number(problemId)]} qNo={parseInt(problemId)}/>
      </div>
      <footer className="flex justify-around items-center p-4 border-t bg-gray-50">
            {/* Previous */}
            <Button
            className='p-6 text-xl'
            variant="outline"
            disabled={parseInt(problemId) === 1} // disable if first problem
            onClick={() => goToProblem(parseInt(problemId) - 1)}
            >
            ← Previous
            </Button>

            {/* Next */}
            <Button
            className='p-6 text-xl' 
            disabled={parseInt(problemId) === questions.length} // disable if last problem
            onClick={() => goToProblem(parseInt(problemId) + 1)}
            >
            Next →
            </Button>
      </footer>
    </div>
    
  )
}
