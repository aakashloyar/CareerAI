import { NextRequest,NextResponse } from "next/server";
import {coverLetterSchema,coverLetterType} from "@/lib/validation"
import {model} from '@/lib/geminimodel'
export async function POST(req:NextRequest) {
    try {
        console.log('1');
        const body = await req.json();
        const validated=coverLetterSchema.safeParse(body);
        console.log('2');
        if(!validated.success) {
            return NextResponse.json({ error: validated.error.format() }, { status: 400 });
        }
        console.log('3');
        const {companyName,jobTitle,jobDescription}=validated.data;
        console.log('4');
        
        const res=await model.generateContent(prompt);
        console.log('5');
        return Response.json({message:res},{status:200})
        
    } catch(err) {
        return Response.json({error:"internal server error"},{status:500})
    }
    

}