'use server'
import {prisma} from "@/lib/prisma"
import {options} from '@/auth'
import { getServerSession } from "next-auth";
import {model} from '@/lib/geminimodel'
import {quizType} from '@/lib/validation'
type Input=Pick<quizType,"topics" | "count"|"type">;
export async function createQuiz(input:Input) {
    const session = await getServerSession(options);
    if (!session || !session.user?.id) throw new Error("Unauthorized");
    const userId=session.user.id;
   // console.log(userId+"********");
   // console.log(id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");
    const prompt=
    `You are a quiz generation assistant.
    Based on the following inputs, generate a list of multiple-choice questions with ${(input.type=="both")?"single and multi both":input.type} correct option.

    Topic: ${input.topics}

    Number of Questions: ${input.count}

    For each question, follow this exact format:
    Question {number}: {question text}
    A) {option A}  
    B) {option B}  
    C) {option C}  
    D) {option D}  
    Answer: {correct option letter (A/B/C/D)}
    Type: single/multi
    Example:
    Question 1: What is the capital of France?  
    A) Berlin  
    B) Madrid  
    C) Paris  
    D) Rome  
    Answer: B D 
    Type: multi
`
    const quiz=await prisma.quiz.create({
        data:{
            count:input.count,
            type:input.type,
            name:"default",
            userId:userId
        }
    })
    let topId:string[]=[];
    for(const top of input.topics) {
      const curr=await prisma.topic.create({
        data:{
          value:top.value
        }
      })
      topId.push(curr.id);
    }
    for(const top of topId) {
      await prisma.quizTopic.create({
        data:{
          quizId:quiz.id,
          topicId:top
        }
      })
    }
    const res=await model.generateContent(prompt);
    const response=res.response.text();
    const arr=parseQuizOutput(response);
    for(let i=0;i<arr.length;i++) {
        const current=arr[i];
        const que=await prisma.question.create({
          data:{
            value: current.question,
            quizId:quiz.id,
            type:current.type
          }
        })
        for(let i=0;i<current.options.length;i++) {
          const opt=await prisma.option.create({
            data:{
              value:current.options[i]
            }
          })
          await prisma.queOpt.create({
            data:{
              questionId:que.id,
              optionId:opt.id,
              isCorrect:current.isCorrect[i]
            }
          })
        }
    }
    console.log("****done");
    return quiz.id;
}

type QuizQuestion = {
  question: string;
  options:string[];
  isCorrect: boolean[]; 
  type: "single" | "multi";
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
    const ans_arr=answerLine?.split(' ');
    if (!question ||!ans_arr ||!ans_arr.length||(ans_arr.length) < 2) {
      console.warn("Skipping malformed question block:", block);
      continue;
    }
    let corr_opt_arr:number[];
    let isCorrect: boolean[] = Array(options.length).fill(false);
    let is: boolean = false;
    for(let i=1;i<ans_arr.length;i++) {
      let x=ans_arr[i].charCodeAt(0)-65;
      if(x < 0 || x >= options.length) {
        is=true;
        break;
      }
    }
    if (is) {
      console.warn("Answer letter out of bounds:");
      continue;
    }
    const typeLine = lines.find(line => line.startsWith("Type:"));
    const type_arr=typeLine?.split(' ');
    if(!type_arr ||type_arr.length<2){
      console.warn("Type not found:");
      continue;
    }
    const type=type_arr[1];
    if(!(type=="single" ||type=="multi")) {
      console.warn("Incorrect Type");
      continue;
    }
    questions.push({
      question,
      options,
      isCorrect,
      type
    });
  }

  return questions;
}
