import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header/Header'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prairie Burn Nursery',
  description: 'Minnesota native wildflower nursery',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            {children}
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
              <p>Copyright &#169; - Prairie Burn Nursery</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
