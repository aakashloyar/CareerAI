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
})


export type UsersSignUpType = z.infer<typeof userSignUpSchema>;
export type UsersSignInType = z.infer<typeof userSignInSchema>;
export type coverLetterType=z.infer<typeof coverLetterSchema>;
