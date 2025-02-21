import GoogleProvider from "next-auth/providers/google";
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import { userSchema } from "@/lib/validation";

const handler=NextAuth({
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
              async authorize(credentials, req) {
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
          
                if (user) {
                  return user
                } else {
                  return null
        
                }
              }
            })
    ],
    callbacks: {
      async jwt({ token, user }:{token:JWT,user:any}) {
        if (user) {
          token.id = user.id;
          token.firstName = user.firstName;
          token.lastName = user.lastName;
        }
        return token;
      },
      async session({ session, token }:{session:Session,token:JWT}) {
        if (session.user) {
          session.user.id = token.id;
          session.user.firstName = token.firstName;
          session.user.lastName = token.lastName;
        }
        return session;
      },
    }
    ,
    pages:{
      signIn:'/auth/signin'
    }
    ,secret:process.env.NEXT_AUTH_SECRET

})

export {handler as GET, handler as POST}



interface Session {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface JWT {
  id: string;
  firstName: string;
  lastName: string;
}
