import { NextRequest,NextResponse } from "next/server";
import {coverLetterSchema,coverLetterType} from "@/lib/validation"
import coverPrompt from "@/lib/prompt/coverletter";
import {model} from '@/lib/geminimodel'
import {prisma} from '@/lib/prisma'
import { getServerSession } from "next-auth";
import {options} from '@/auth'
export async function POST(req:NextRequest) {
    const session=await getServerSession(options);
    try {
        if(!session ||!session.user||!session.user.id) return NextResponse.json({error:"login first"},{status:400});
        const body = await req.json();
        const validated=coverLetterSchema.safeParse(body);
        if(!validated.success) {
            return NextResponse.json({ error: validated.error.format()}, { status: 400 });
        }
        const data=validated.data;
        const prompt=coverPrompt(data);
        const res=await model.generateContent(prompt);
        const content = res.response.text().trim();
        const coverLetter = await prisma.coverletter.create({
            data: {
              content,
              jobDescription: data.jobDescription,
              companyName: data.companyName,
              jobTitle: data.jobTitle,
              status: "completed",
              userId:session.user.id
            },
          });
        return Response.json({message:coverLetter},{status:200})
        
    } catch(err) {
        return Response.json({error:"internal server error"},{status:500})
    }
    

}