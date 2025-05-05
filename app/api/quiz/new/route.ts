import { NextRequest,NextResponse } from "next/server";
import {quizSchema,quizType} from "@/lib/validation"
import quizPrompt from "@/lib/prompt/quizprompt";
import {model} from '@/lib/geminimodel'
import {prisma} from '@/lib/prisma'
import { getServerSession } from "next-auth";
import {options} from '@/auth'
export async function POST(req:NextRequest) {
    const session=await getServerSession(options);
    try {
        console.log(session)
        if(!session ||!session.user||!session.user.id) return NextResponse.json({error:"login first"},{status:400});
       
        const body = await req.json();
        const validated=quizSchema.safeParse(body.data);
        if(!validated.success) {
            return NextResponse.json({ error: validated.error.format()}, { status: 400 });
        }
        const data=validated.data;
        const prompt=quizPrompt(data);
        const res=await model.generateContent(prompt);
        const content = res.response.text().trim();
        const quiz = await prisma.quiz.create({
            data: {
              name:"default name",
              count:data.count,
              userId:session.user.id,
              topic:data.topic
            },
        });

        let parsedQuestions;
        try {
        parsedQuestions = JSON.parse(content);
        } catch (e) {
        return NextResponse.json({ error: "Invalid quiz format from AI" }, { status: 500 });
        }

        if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
        return NextResponse.json({ error: "Empty or invalid quiz data" }, { status: 500 });
        }

        try {
        await prisma.questions.createMany({
            data: parsedQuestions.map((q: any) => ({
            quizId: quiz.id,
            question: q.question,
            options: Object.values(q.options),
            correctOption: q.correctAnswer,
            })),
        });
        } catch (err) {
            return NextResponse.json({ error: "Failed to save questions" }, { status: 500 });
        }
        return Response.json({message:quiz},{status:200})

    } catch(err) {
        return Response.json({error:"internal server error"},{status:500})
    }
}