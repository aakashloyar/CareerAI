import { NextRequest,NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'
import { getServerSession } from "next-auth";
import {options} from '@/auth'
export async function GET(req:NextRequest) {
    const session=await getServerSession(options);
    try {
        if(!session ||!session.user||!session.user.id) return NextResponse.json({error:"login first"},{status:400});       
        const coverLetters = await prisma.coverletter.findMany({
            where:{
                userId:session.user.id
            },
            select:{
                id:true,
                companyName:true,
                createdAt:true,
                jobTitle:true
            }
        })
        return Response.json({message:coverLetters},{status:200})
        
    } catch(err) {
        return Response.json({error:"internal server error"},{status:500})
    }
}