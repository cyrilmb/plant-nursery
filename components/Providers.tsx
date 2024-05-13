import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'

//wrap whole app in Providers, a serverside component,
export default async function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  //children is Layout, now has access to the session authentication throughout client components
  return <SessionProvider session={session}>{children}</SessionProvider>
}
