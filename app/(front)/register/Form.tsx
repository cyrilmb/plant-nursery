import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Form = () => {
  const { data: session } = useSession()

  const params = useSearchParams()
  const router = useRouter()
  let callbackUrl = params.get('callbackUrl') || '/'

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  //if session and user exist, no need to create new user
  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, params, router, session])

  //after info entered, this function submits form
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application.json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
      if (res.ok) {
        return router.push(
          `/signin?callbackUrl=${callbackUrl}&success=Account has been created`
        )
      } else {
        const data = await res.json()
        throw new Error(data.message)
      }
    } catch (err: any) {
      toast.error(err.message || 'message')
    }
  }
}

export default Form
