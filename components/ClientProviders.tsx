'use client'
import toast, { Toaster } from 'react-hot-toast'
import { SWRConfig } from 'swr'

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    //SWR is alternative to react-query, data fetching, caching, state management
    <SWRConfig
      value={{
        onError: (error, key) => {
          toast.error(error.message)
        },
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init)
          if (!res.ok) {
            throw new Error('An error occured while fetching data.')
          }
          return res.json()
        },
      }}
    >
      {/* show toast messages in app */}
      <Toaster />
      {children}
    </SWRConfig>
  )
}
