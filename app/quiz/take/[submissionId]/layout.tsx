'use client'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuestionStore } from '@/store/questionStore';
import TakeClient from '../_components/takeclient';
type RouteParams = {
  submissionId: string;
};
export default function DashboardLayout({children} :{children:React.ReactNode}) {
  const { submissionId } = useParams() as RouteParams;
  const { setQuestions } = useQuestionStore();
  useEffect(() => {
      const fetchData = async () => {
        try {
          const res= await fetch(`/api/quiz/${submissionId}/`);
          const quizId=await res.json();
          const res1 = await fetch(`/api/quiz/${quizId}/questions`);
          const res2=await fetch(`/api/quiz/${quizId}/info`);
          const questions = await res1.json();
          const quizdata  = await res2.json();
          setQuestions(questions);
          console.log(questions)
        } catch (err) {
          console.error('Failed to fetch questions', err);
        }
      };
  
    if (submissionId) fetchData();
  }, [submissionId, setQuestions]);
  return (
    <div className="min-h-screen pt-14 flex flex-col">
      <header className='flex justify-between px-6 border-4 border-gray-600 rounded-xl p-8'>
          <div className='text-xl font-bold'>
              Quiz1
          </div>
          <div className=''>
              Timer
          </div>
      </header>
      <main className="flex-1 p-6">
        {children}
      </main>
      <footer className='border-t-2 p-4'>
          <Pagination>
              <PaginationContent>
                  <PaginationItem>
                  <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                  <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                  <PaginationNext href="#" />
                  </PaginationItem>
              </PaginationContent>
          </Pagination>

      </footer>
    </div>
  )
}

