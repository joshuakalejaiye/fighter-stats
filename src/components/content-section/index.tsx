import { type ReactNode } from 'react'

export default async function ContentSection({
  className,
  children,
}: Readonly<{
  className?: string
  children: ReactNode
}>) {
  return (
    <div
      className={`w-screen px-4 pt-12 md:max-w-[850px] md:px-0 ${className}`}
    >
      {children}
    </div>
  )
}
