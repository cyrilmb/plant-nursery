'use client'
import { cartStore } from '@/lib/hooks/useCartStore'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { SWRConfig } from 'swr'

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  //reload data in cartstore when using multiple browser tabs, so all tabs are in sync
  const updateStore = () => {
    cartStore.persist.rehydrate()
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', updateStore)
    window.addEventListener('focus', updateStore)
    return () => {
      document.removeEventListener('visibilitychange', updateStore)
      window.removeEventListener('focus', updateStore)
    }
  }, [])

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
