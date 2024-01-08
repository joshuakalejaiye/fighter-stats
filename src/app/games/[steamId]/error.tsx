'use client'

export default function ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <div>An error occured: {error.name}</div>
}
