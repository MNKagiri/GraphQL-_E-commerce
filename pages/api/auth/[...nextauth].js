import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'


export default NextAuth({
    //recently added
    secret: process.env.JWT_SECRET,
     session: {
        jwt: true
    },   

    providers : [

         GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }), 

        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),


    ], 

    callbacks: {

      async jwt({token, user}){
        if(user){
          token.user = {
            email: user.email,
          }
        }

        return token
      },

      async redirect(url, baseUrl){
        return '/'
      }
    }, 

    session: async({session, token}) => {

      if(token){

        session.user = token.user
      }

      return session
    }})