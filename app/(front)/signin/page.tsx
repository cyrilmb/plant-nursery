import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default async function Signin() {
  return <Form />
}
