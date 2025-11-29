'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuestionStore } from '@/store/questionStore';
import { quiz_details, quiz_questions } from '@/actions/quiz-actions';
import { submission_details } from '@/actions/submission-details'; 
// import TakeClient from '../../_components/takeclient';
import { useRouter } from 'next/navigation';
import { quizType,submissionType } from '@/lib/validation';
import { divider } from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import {startQuiz,endQuiz} from '@/actions/quiz-actions'
type quiz_Type=Pick<quizType,"id" | "count" | "type" | "name">
type RouteParams = {
  quizId:string;
  submissionId: string;
};
import axios from 'axios';
import CountdownTimer from '../../_components/timer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
export default function DashboardLayout({children} :{children:React.ReactNode}) {
  const router=useRouter();
  const { quizId,submissionId } = useParams() as RouteParams;
  const { setQuestions, questions} = useQuestionStore();
  // const goToPage = (newPage: number) => {
  //   if (newPage < 1) return; // prevent going below page 1
  //   router.push(`/quiz/take/${quizId}/${submissionId}/${newPage}`);
  // };
  const [quiz, setQuiz] = useState<quiz_Type|null>(null);
  const [submission, setSubmission] = useState<submissionType|null>(null);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const quiz = await quiz_details(quizId);
        const rawquestions = await quiz_questions(quizId);
        const submission = await submission_details(submissionId);
        if (quiz == null || rawquestions.length == 0 || submission == null) return false;
        setQuestions(rawquestions);
        setQuiz(quiz);
        setSubmission(submission)
        return true;
      } catch (err) {
        console.error("Here is the error ***" + err);
        return false;
      }
    };
    fetchData();
  }, [submissionId, quizId]);
  if(submission==null ||quiz==null ||submission.quizId!=quizId) {
    return (
      <div>
        Error 404: Page Not found
      </div>
    )
  }
  const onStart=async()=>{
    //here we will call the start-quiz functionality
    const updated=await startQuiz(submission.id)
    setSubmission(updated)
    router.push(`/quiz/take/${quizId}/${submissionId}/problem/1`)
    console.log(updated)
  }
  const onEnd=async()=>{
    //here we will call the start-quiz functionality
    
    const updated=await endQuiz(submission.id)
    console.log(questions)
    axios.post("/api/rabbit/sendMessage", questions)
    //setSubmission(updated)
    //console.log(updated)
  }
  return (
    <div className="min-h-screen pt-14 flex flex-col">
      <header className="flex justify-between items-center px-8 py-6 border-2 border-gray-300 rounded-2xl shadow-md bg-gradient-to-r from-white to-gray-50">
        <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-2xl font-bold shadow-lg tracking-wide">
          Quiz {quizId}
        </div>

        <div className="flex items-center">
          {submission.startedAt ? (
            <div className="flex items-center gap-4 px-5 py-2 bg-green-50 border border-green-300 rounded-xl shadow-sm">
              <span className="text-lg font-semibold text-green-700 flex items-center gap-2">
                ⏳ <CountdownTimer startTime={submission.startedAt} allotedTime={submission.time} />
              </span>

              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      onClick={() => console.log("Submit logic here")} 
                      className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
                    >
                      Submit Test
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-2xl shadow-xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl font-bold text-gray-800">
                        End the quiz?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-600 leading-relaxed">
                        Are you sure you want to end this test?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex gap-3">
                      <AlertDialogCancel className="px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-100">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={onEnd}
                        className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-md"
                      >
                        Yes, End
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              
            </div>

          ) : (
            <div className="flex items-center gap-4 px-5 py-3 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
              <div className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                ⏳ {submission.time} sec
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition">
                    Start Quiz
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl shadow-xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold text-gray-800">
                      Start the Quiz?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600 leading-relaxed">
                      Once you start, the timer will begin and you must complete the quiz
                      within the allotted time. Are you sure you want to continue?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex gap-3">
                    <AlertDialogCancel className="px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-100">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onStart}
                      className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-md"
                    >
                      Yes, Start
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}