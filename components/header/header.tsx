import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link href="/" className="btn btn-ghost text-lg">
            Prairie Burn Nursery
          </Link>
          <ul>
            <li>
              <Link href="/cart" className="btn btn-ghost rounded-btn">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/signin" className="btn btn-ghost rounded-btn">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
