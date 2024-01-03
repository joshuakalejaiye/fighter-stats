"use client"

export default function ({  error, reset }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {

    return (<div>Valve isn't responding for some reason...</div>)
}