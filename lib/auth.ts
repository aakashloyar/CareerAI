import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import {JWT} from 'next-auth/jwt'
import { userSignInSchema,UsersSignInType } from "./validation";
import { prisma } from "@/lib/prisma"
import {Session} from 'next-auth'
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password,parseInt(process.env.saltRounds!));
  return hashedPassword;
}
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export const authoptions={
    providers: [
            GithubProvider({
              clientId: process.env.GITHUB_ID||"",
              clientSecret: process.env.GITHUB_SECRET||"",
            }),
            GoogleProvider({
              clientId: process.env.GOOGLE_CLIENT_ID||"",
              clientSecret: process.env.GOOGLE_CLIENT_SECRET||""
            }),
            CredentialsProvider({
              name: "Credentials",
             
              credentials: {
                firstName: { label: "Username", type: "text", placeholder: "jsmith" },
                lastName: { label: "Username", type: "text", placeholder: "jsmith" },
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials:any) {
                try{
                    const validatedUser = userSignInSchema.safeParse(credentials)
                    if(!validatedUser.success) return null;
                    const user = await prisma.user.findUnique({
                        where: { email: validatedUser.data.email },
                    })      
                    if(!user || !(await comparePassword(validatedUser.data.password, user.password!))) return null;
                    console.log(user);
                    return user;     
                } catch(err) {
                  return null;
                }
              }
            })
    ],
    callbacks: {
        async jwt({ token, account,user }:{token:JWT ;account:any;user:any}) {
            // console.log('inside jwt');
            // console.log(user);
            // console.log(account);
            // console.log(token);
            // console.log('outside jwt');
            if (account) {
              token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }:{session:Session;token:JWT;user:any}) {
            // console.log('Inside seesion')
            // console.log(session);
            // console.log(token);
            // console.log(user);
            // console.log('outsied session');
            return session
        }
    }
    ,
    pages:{
      signIn:'/auth/signin'
    }
    ,secret:process.env.NEXT_AUTH_SECRET

}



