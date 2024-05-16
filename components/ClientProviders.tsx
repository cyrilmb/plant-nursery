'use client'
import { Toaster } from 'react-hot-toast'

//show toast messages in app

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Toaster />
      {children}
    </>
  )
}
