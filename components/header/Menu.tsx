'use client'

import useCartService from '@/lib/hooks/useCartStore'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Menu = () => {
  //show number of items in cart
  const { items } = useCartService()

  //corrects server/client rendering issues
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      <ul className="flex items-stretch">
        <li>
          <Link className="btn btn-ghost rounded-btn" href="/cart">
            Cart
            {mounted && items.length != 0 && (
              <div className="badge badge-secondary">
                {/* calculate sum of quatities in cart */}
                {items.reduce((a, c) => a + c.qty, 0)}{' '}
              </div>
            )}
          </Link>
        </li>
        <button className="btn btn-ghost rounded-btn" type="button">
          Sign In
        </button>
      </ul>
    </div>
  )
}

export default Menu
