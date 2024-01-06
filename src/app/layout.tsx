import { AntdRegistry } from '@ant-design/nextjs-registry'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Horarios BK',
  description: 'Horarios BK',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className='max-w-lg min-h-screen  mx-auto px-4 py-8'>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </main>
      </body>
    </html>
  )
}
