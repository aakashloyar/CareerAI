import CoverletterItem from '@/components/coverletter/list'
import { coverLetterType } from '@/lib/validation';
import {prisma} from '@/lib/prisma'
import {options} from '@/auth'
import { getServerSession } from "next-auth";
import Clientpart from "./clientpart"
export  default async function() {
    const session=await getServerSession(options);
    type cllisttype=Omit<coverLetterType,'jobDescription'|'experience'|'skills'> &{id:string} &{createdAt:Date};
    const fetch=async():Promise<cllisttype[]>=> {
        try{
            if(!session ||!session.user||!session.user.id) return[];       
            const coverLetters = await prisma.coverletter.findMany({
                        where:{
                            userId:session.user.id
                        },
                        select:{
                            id:true,
                            companyName:true,
                            createdAt:true,
                            jobTitle:true,
                            name:true
                        },
                        orderBy:{
                            createdAt:"desc"
                        }
            })
            return coverLetters;
        }
        catch {
            return [];
        }
        
    }
    const cllist=await fetch();
    return (
        <div className='px-8 bg-slate-800 min-h-screen text-white pt-20'>
            <div className='flex justify-between items-center border-b-2 border-white mb-4'>
                <div className='text-2xl md:text-4xl font-bold '>
                    My Cover Letters
                </div>
                <div className=''>
                    <Clientpart/>
                </div>
            </div>
            <div className='p-1'>
                {cllist.map((cl)=>(
                    <div key={cl.id} className='p-2'>
                        <CoverletterItem name={cl.name} company={cl.companyName} title={cl.jobTitle} createdOn={cl.createdAt} />
                    </div>
                ))}
            </div>
        </div>
    )
}

