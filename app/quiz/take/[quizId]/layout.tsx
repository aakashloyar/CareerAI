import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
interface PageProps {
  params: Promise<{
    quizId: string
  }>,
  children:React.ReactNode

}
import { getServerSession } from "next-auth";
import {options} from '@/auth'
import {prisma} from '@/lib/prisma'
export default async function DashboardLayout({ params,children }:PageProps) {
  const {quizId} = await params;
  const fetch = async ()=> {
    const session = await getServerSession(options);
    try {
        if (!session || !session.user || !session.user.id) return;       
        const quiz=await prisma.quiz.findUnique({
            where:{
              id:quizId
            },
            select:{
              id:true,
              count:true,
            }
        });
    } catch {
        return [];
    }
  }
  await fetch();
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

