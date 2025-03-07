import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import {JWT} from 'next-auth/jwt'
import { userSignInSchema,UsersSignInType } from "./lib/validation";
import { prisma } from "@/lib/prisma"
import {Session} from 'next-auth'
import bcrypt from "bcryptjs";
import NextAuth from "next-auth"

async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

async function getUserDetails(email:string):Promise<User|null> {
  const user=await prisma.user.findUnique({
    where:{email},
    select:{
      id:true,
      email:true,
      firstName:true,
      lastName:true
    }
  })
  return user;
}
export const options = {
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
            return user;     
        } catch(err) {
          return null;
        }
      }
    })
  ],
  callbacks: {
  async signIn({ user, account }:{user:any,account:any}) {
      if (account.provider === "google"||account.provider === "github") {
        console.log(user);
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              firstName: user.name?.split(" ")[0] || "",
              lastName: user.name?.split(" ")[1] || "",
            },
          });
        }
      }
      return true;
  },
  async session({ session, token }:{session:extendSession;token:JWT}) {
    if (token?.email && typeof token.email==='string') {
      const user:User|null= (await getUserDetails(token.email));
      if(user) {
        console.log(user)
        session.user = session.user || {};
        session.user.firstName=user.firstName;
        session.user.lastName=user.lastName;
        token.id=user.id;
      }
    }
    return session
  }},

  

  pages:{
    signIn:'/auth/signin'
  },
  secret:process.env.NEXT_AUTH_SECRET
}

export default NextAuth(options)

interface extendSession extends Session {
  user?:User
}
interface User {
  firstName?:string|null,
  lastName?:string|null,
  name?:string|null,
  id?:string|null,
  email?:string|null
}