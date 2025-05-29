import { prisma } from "@/lib/prisma"
import { questionType } from "@/lib/validation"
export type takequestionType=Omit<questionType,'correctOption'> &{pickOption:string|null}
export default async function Take({params}:{params:{id:string}}) {
    let {id}=params
    id=id[0]
    //console.log(id)
    const quiz=await prisma.quiz.findUnique({
      where:{
        id:id
      }
    })
    if(!quiz) {
      return(
        <div className='flex justify-center items-center min-h-screen'>
          <div className='text-xl font-bold'>
            404 Page NOT Found
          </div>
        </div>
      )
    }
    const questions=prisma.questions.findMany({
      where:{
        quizId:id
      },
      select:{
        question:true,
        options:true,
      }
    })
    return (
        <div>
            
           
        </div>
    )
}
