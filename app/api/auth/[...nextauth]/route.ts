import GoogleProvider from "next-auth/providers/google";
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"

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
                username: { label: "Username", type: "text", placeholder: "jsmith" },
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
    ]
    ,
    pages:{
      signIn:'/auth/signin'
    }
    ,secret:process.env.NEXT_AUTH_SECRET

})

export {handler as GET, handler as POST}
