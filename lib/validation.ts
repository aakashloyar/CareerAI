import { z } from "zod";

export const userSignUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const userSignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})


export const coverLetterSchema = z.object({
  companyName: z.string().min(2,"Company Name must be at least 2 characters"),
  jobTitle: z.string().min(2, "Password must be at least 2 characters"),
  jobDescription:z.string(),
  experience:z.string(),
  skills:z.string(),
  name:z.string().min(3,"Cover Letter Name must be at least 3 characters")
})


export const quizSchema = z.object({
  name:z.string().min(2,"quiz name must be at least 2 characters"),
  topic:z.string().min(4,"Topic name must be at least 4 characters"),
  count:z.number().gte(5,"Number of question must be greater than 5"),
})

export const questionSchema = z.object({
  id:z.string().min(2,"id must be at least 2 characters"),
  value:z.string().min(2,"quiz name must be at least 2 characters"),
})
export const optionSchema=z.object({
  id:z.string().min(2,"id must be at least 2 characters"),
  value:z.string().min(2,"quiz name must be at least 2 characters"),
})
export const questionWithOptionsSchema = questionSchema.extend({
  options: z.array(optionSchema),
});

export type UsersSignUpType = z.infer<typeof userSignUpSchema>;
export type UsersSignInType = z.infer<typeof userSignInSchema>;
export type coverLetterType=z.infer<typeof coverLetterSchema>;
export type quizType=z.infer<typeof quizSchema>;
export type questionType=z.infer<typeof questionSchema>;
export type optionType=z.infer<typeof optionSchema>;
export type queOptType = z.infer<typeof questionWithOptionsSchema>;
