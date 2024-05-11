import { CredentialsProvider } from "next-auth/providers/credentials"

export const config = {
    providers: [
        CredentialProvider({
            credentials: {
                email: {
                    type: 'email',
                },
                async authorize(credentials) {
                    
                }
            }
        })
    ]
}