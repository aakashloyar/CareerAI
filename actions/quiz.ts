import {prisma} from "@/lib/prisma"
import {options} from '@/auth'
import { getServerSession } from "next-auth";
import {model} from '@/lib/geminimodel'
import {quizType} from '@/lib/validation'
type Input=Pick<quizType,"topic" | "count">;
export async function getCoverLetter(input:Input) {
    const session = await getServerSession(options);
    if (!session || !session.user?.id) throw new Error("Unauthorized");
    const userId=session.user.id;
    console.log(userId+"********");
   // console.log(id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");
    const prompt=
    `You are a quiz generation assistant.
    Based on the following inputs, generate a list of multiple-choice questions.

    Topic: ${input.topic}

    Number of Questions: ${input.count}

    For each question, follow this exact format:
    Question {number}: {question text}
    A) {option A}  
    B) {option B}  
    C) {option C}  
    D) {option D}  
    Answer: {correct option letter (A/B/C/D)}
    Example:
    Question 1: What is the capital of France?  
    A) Berlin  
    B) Madrid  
    C) Paris  
    D) Rome  
    Answer: C
`
    const quiz=await prisma.quiz.create({
        data:{
            topic:input.topic,
            count:input.count,
            name:"default",
            userId:userId
        }
    })
    const res=await model.generateContent(prompt);
    const response=res.response.text();
    const arr=parseQuizOutput(response);
    for(let i=0;i<arr.length;i++) {
        const current=arr[i];
        const x=await prisma.questions.create({
          data:{
            options: current.options,
            question: current.question,
            correctOption: current.answer,
            quizId:quiz.id
          }
        })
    }
    return true;

    // const quiz=prisma.quiz.findFirst({
    //     where:{
    //         name:"aalu"
    //     }
    // })
    // if (!quiz) throw new Error("Quiz name already exist");

}

type QuizQuestion = {
  question: string;
  options:string[];
  answer: string; 
};

function parseQuizOutput(raw: string): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  const blocks = raw.trim().split(/Question \d+:/g).filter(Boolean);

  for (const block of blocks) {
    const lines = block.trim().split('\n').map(line => line.trim());

    const questionLine = lines[0];
    const question = questionLine;

    const options: string[] = [];

    // Parse lines like: A) Option text
    for (const line of lines.slice(1)) {
      const optionMatch = line.match(/^([A-Z])\)\s+(.*)$/);
      if (optionMatch) {
        options.push(optionMatch[2]); // Push only the text
      }
    }

    // Find and extract the correct answer letter
    const answerLine = lines.find(line => line.startsWith("Answer:"));
    const answerMatch = answerLine?.match(/^Answer:\s*([A-Z])$/);

    if (!question || !answerMatch) {
      console.warn("Skipping malformed question block:", block);
      continue;
    }

    const answerLetter = answerMatch[1];
    const answerIndex = answerLetter.charCodeAt(0) - 65; // A → 0, B → 1, etc.

    if (answerIndex < 0 || answerIndex >= options.length) {
      console.warn("Answer letter out of bounds:", answerLetter);
      continue;
    }

    questions.push({
      question,
      options,
      answer: answerLetter,
    });
  }

  return questions;
}
