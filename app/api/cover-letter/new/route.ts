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
        console.log(session)
        console.log(1);
        if(!session ||!session.user||!session.user.id) return NextResponse.json({error:"login first"},{status:400});
        console.log(2);
        const body = await req.json();
        console.log(3);
        const validated=coverLetterSchema.safeParse(body.data);
        console.log(body);
        console.log(4);
        if(!validated.success) {
            return NextResponse.json({ error: validated.error.format()}, { status: 400 });
        }
        console.log(5);
        const data=validated.data;
        const prompt=coverPrompt(data,session.user);
        console.log(6);
        const res=await model.generateContent(prompt);
        console.log(7);
        const content = res.response.text().trim();
        console.log(7);
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
          console.log(7);
          console.log(coverLetter)
        return Response.json({message:coverLetter},{status:200})
        
    } catch(err) {
        return Response.json({error:"internal server error"},{status:500})
    }
    

}