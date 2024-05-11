import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import UserModel from "./models/UserModel";
import bcrypt from 'bcryptjs'

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
}