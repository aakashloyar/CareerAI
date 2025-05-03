import { quizType } from "../validation";
export default function coverPrompt(data: quizType) {
    const prompt = `
  Generate a ${data.count}-question multiple-choice quiz on the topic "${data.topic}".
  Each question should:
  - Be clear and concise.
  - Have exactly 4 answer options (labeled A, B, C, D).
  - Include the correct option as "correctAnswer": "A" (or B/C/D).
  
  Return the quiz in the following JSON format:
  [
    {
      "question": "What is the capital of France?",
      "options": {
        "A": "Paris",
        "B": "London",
        "C": "Berlin",
        "D": "Rome"
      },
      "correctAnswer": "A"
    },
    ...
  ]
  Ensure questions vary in difficulty and cover different subtopics within "${data.topic}".
  `;
    return prompt.trim();
  }
  
