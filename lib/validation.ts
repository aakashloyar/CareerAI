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
  id:z.string(),
  name:z.string().min(2,"quiz name must be at least 2 characters"),
  topics: z.array(z.object({ value: z.string().min(1, "Topic value must be at least 1 character") })).min(1, "At least one topic is required"),
  type: z.enum(["single", "multi", "both"]).describe("must be of specific type"),
  count:z.number().gte(5,"Number of question must be greater than 5"),
  createdAt:z.date(),
})

export const questionSchema = z.object({
  id:z.string().min(2,"id must be at least 2 characters"),
  value:z.string().min(2,"quiz name must be at least 2 characters"),
  type:z.enum(["single","multi"]).describe("must be of specific type")
})
export const optionSchema=z.object({
  id:z.string().min(2,"id must be at least 2 characters"),
  value:z.string().min(2,"quiz name must be at least 2 characters"),
  isPicked:z.boolean().default(false)
})
export const questionWithOptionsSchema = questionSchema.extend({
  options: z.array(optionSchema),
});

export const SubmissionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  time: z.number().int(),
  createdAt: z.date(),        // DateTime -> JS Date
  startedAt: z.date().nullable(),   // optional DateTime
  quizId: z.string(),
  percentage: z.string().nullable(), // optional String
  sumbittedAt: z.date().nullable(),  // optional DateTime
});

export type submissionType = z.infer<typeof SubmissionSchema>;
export type UsersSignUpType = z.infer<typeof userSignUpSchema>;
export type UsersSignInType = z.infer<typeof userSignInSchema>;
export type coverLetterType=z.infer<typeof coverLetterSchema>;
export type quizType=z.infer<typeof quizSchema>;
export type questionType=z.infer<typeof questionSchema>;
export type optionType=z.infer<typeof optionSchema>;
export type queOptType = z.infer<typeof questionWithOptionsSchema>;
