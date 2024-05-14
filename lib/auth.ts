import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "./dbConnect"
import UserModel from "./models/UserModel"
import bcrypt from 'bcryptjs'
import NextAuth from "next-auth"

export const config = {
    providers: [
        CredentialsProvider({
          credentials: {
            email: {
              type: 'email',
            },
            password: { type: 'password' },
          },
          async authorize(credentials) {
            await dbConnect()
            if (credentials == null) return null
    
            const user = await UserModel.findOne({ email: credentials.email })
    
            if (user) {
              const isMatch = await bcrypt.compare(
                credentials.password as string,
                user.password
              )
              if (isMatch) {
                return user
              }
            }
            return null
          },
        }),
      ],
      pages: {
        signIn: '/signin',
        newUser: '/register',
        error: '/signin'
      },
      callbacks: {
        authorized({ request, auth }: any) {
          const protectedPaths = [
            //user must be authenticated to access these routes
            /\/shipping/,
            /\/payment/,
            /\/place-order/,
            /\/profile/,
            //regex to make dynamic values for order path
            /\/order\/(.*)/,
            /\/admin/,
          ]
          //if URL is in above list, check user auth, if null return false, 
          const { pathname } = request.nextUrl
          if (protectedPaths.some((p) => p.test(pathname))) return !!auth
          return true
        },
        //JSON web tokens
        async jwt({ user, trigger, session, token }: any) {
            //check user info from database
            if (user) {
              token.user = {
                _id: user._id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
              }
            }
            //update user email and name if session exists and trigger returns update
            if (trigger === 'update' && session) {
              token.user = {
                ...token.user,
                email: session.user.email,
                name: session.user.name,
              }
            }
            return token
          },
          //return user information from above jwt for the session for client side authentication
          session: async ({ session, token }: any) => {
            if (token) {
              session.user = token.user
            }
            return session
          },
      },
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
  } = NextAuth(config)