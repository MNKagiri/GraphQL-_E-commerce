import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import  CredentialsProvider  from 'next-auth/providers/credentials'

import connectMongo from '../../../dbconn/conn'
import Users from '../../../model/Schema'
import bcrypt from 'bcrypt'

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


        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials ",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "Email", type: "email", placeholder: "jsmith@mail.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                connectMongo().then(() => console.log("success")).catch(error => {error: 'connection failed'})
                
                let checkEmail =  credentials.email
                

                //check user existence
               const user = await Users.findOne({checkEmail})
               if(!user){
                    throw new Error("No user found with Email Please Sign Up ")
                } 
                // compare()
           
                await bcrypt.compare(credentials.password, user.password).catch(err => console.log(err))
            
              
             
              return user
            }
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