'use client'
import { qlisttype } from "../list/page"
import {Button} from "@/components/ui/button"
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
export function Quiz({quiz}:{quiz:qlisttype}) {
    const router=useRouter();
    console.log(quiz.id);
    return (
        <TableRow key={quiz.id} className="cursor-pointer" onClick={()=>{
            router.push(`/quiz/${quiz.id}`)
        }}>
            <TableCell className="font-medium">{quiz.name}</TableCell>
            <TableCell>{quiz.topic}</TableCell>
            <TableCell className="">{quiz.createdAt.toISOString().split("T")[0]}</TableCell>
            <TableCell>{quiz.count}</TableCell>
        </TableRow>
    )
}
// export function Submission({submission}:{sumbission:qlisttype}) {
//     const router=useRouter();
//     console.log(submission.id);
//     return (
//         <TableRow key={submission.id} className="cursor-pointer" onClick={()=>{
//             router.push(`/submission/${submission.id}`)
//         }}>
//             <TableCell className="font-medium">{submission.createdAt.toISOString().split("T")[0]}</TableCell>
//             <TableCell>{submission.}</TableCell>
//             <TableCell className="">{quiz.createdAt.toISOString().split("T")[0]}</TableCell>
//             <TableCell>{quiz.count}</TableCell>
//         </TableRow>
//     )
// }