import type { Metadata } from 'next'
import '../styles/globals.css'


export const metadata: Metadata = {
  title: 'CheckMate',
  description: 'Make receipt splitting fun and efficient!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='overflow-x-hidden w-screen'>
      {children}

      </body>
    </html>
  )
}

