import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
  title: 'Register',
}

//Server component (bc async) returns Form from client component Form in same folder
//Metadata page title
export default async function Register() {
  return <Form />
}
