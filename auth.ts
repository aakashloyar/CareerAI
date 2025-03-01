import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import {JWT} from 'next-auth/jwt'
import { userSignInSchema,UsersSignInType } from "./lib/validation";
import { prisma } from "@/lib/prisma"
import {Session} from 'next-auth'
import { NextResponse } from "next/server";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { DefaultSession } from "next-auth"

async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password,parseInt(process.env.saltRounds!));
  return hashedPassword;
}
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export const { handlers, signIn, signOut, auth }=NextAuth({
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
  async signIn({ user, account }:{user:any,account:any}) {
      console.log('inside signin***');
      console.log('user='+JSON.stringify(user));
      console.log('account='+JSON.stringify(account));
      console.log('outside signin***')
      if (account.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
            // Create a new user if they don't exist
          await prisma.user.create({
            data: {
              email: user.email,
              firstName: user.name?.split(" ")[0] || "",
              lastName: user.name?.split(" ")[1] || "",
            },
          });
        }
      }
      return true; // Allow sign-in
  },
  async jwt({ token, account,user }:{token:JWT ;account:any;user:any}) {
      console.log('inside jwt***');
      console.log('token='+JSON.stringify(token));
      console.log('user='+JSON.stringify(user));
      console.log('account='+JSON.stringify(account));
      console.log('outside jwt***')
      if (user &&user.id==='string') {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
  },
  async session({ session, token }:{session:Session;token:JWT}) {
    // if (token?.id && typeof token.id==='string') {
    //   const user:User|null= (await getUserDetails(token.id));
    //   if(user) {
    //     session.user = session.user || {}; // Ensure `session.user` exists
    //     session.user.id = token.id;
    //     session.user.firstName = user.firstName || null;
    //     session.user.lastName = user.lastName || null;
    //   }
      
    // }
    console.log('inside session***')
    console.log('session= ' +JSON.stringify(session));
    console.log('token= '+ JSON.stringify(token ));
    console.log('outside session***');
    return session
  }},
  pages:{
  signIn:'/auth/signin'
  },
  secret:process.env.NEXT_AUTH_SECRET

})
    
export const { GET, POST } = handlers



// async function getUserDetails(userId: string):Promise<User|null> {
//   return await prisma.user.findUnique({
//     where: { id: userId },
//     select: { email:true,firstName: true, lastName: true ,id:true},
//   });
// }

// interface SessionProp extends DefaultSession {
//   user?:User
// }
// interface User {
//   id: string;
//   firstName: string | null;
//   lastName: string | null;
//   email: string;
// };

// // interface JWT {
// //   id: string;
// //   firstName: string;
// //   lastName: string;
// //   accessToken:string;
// // }