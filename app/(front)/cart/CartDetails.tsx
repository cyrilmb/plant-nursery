'use client'

import useCartService from '@/lib/hooks/useCartStore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function CartDetails() {
  const router = useRouter()
  const { items, itemsPrice, increase, decrease } = useCartService()

  //avoids errors when comparing server and client side renders
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>

  return (
    <>
      <h1 className="py-4 text-2xl">Shopping Cart</h1>

      {items.length === 0 ? (
        <div>
          Cart is empty <Link href="/">Go Shopping!</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5"></div>
      )}
    </>
  )
}
