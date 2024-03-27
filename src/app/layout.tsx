import '@/styles/globals.css'

import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Fighter Stats',
  description: 'Player numbers and data on your favourite fighting games!',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.className}`}>
        <main className="flex min-h-screen flex-col items-center justify-center text-white dark:bg-black">
          <div className="container mt-6 flex flex-col items-center justify-center gap-12 px-4 py-16 min-w-full">
            {children}
            <footer>
              <a
                className="text-neutral-200 text-sm hover:underline"
                href={'https://www.joshuakal.dev'}
                target="_blank"
              >
                made by joshuakalejaiye
              </a>
            </footer>
          </div>
        </main>
      </body>
    </html>
  )
}
