import { NextRequest,NextResponse } from "next/server";
import {coverLetterSchema,coverLetterType} from "@/lib/validation"
import coverPrompt from "@/lib/prompt/coverletter";
import {model} from '@/lib/geminimodel'
export async function POST(req:NextRequest) {
    try {
        const body = await req.json();
        const validated=coverLetterSchema.safeParse(body);
        if(!validated.success) {
            return NextResponse.json({ error: validated.error.format() }, { status: 400 });
        }
        const prompt=coverPrompt(validated.data);
        const res=await model.generateContent(prompt);
        return Response.json({message:res},{status:200})
        
    } catch(err) {
        return Response.json({error:"internal server error"},{status:500})
    }
    

}