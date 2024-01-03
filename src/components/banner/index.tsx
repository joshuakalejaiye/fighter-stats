"use client"

import type { Game } from "@/index"
import { useEffect, useState } from "react"

export default function Banner({ steamId }: { steamId: number }) {
  const [data, setData] = useState<Game>()
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetch(`/api/games/${steamId}`)
      .then((res) => res.json())
      .then((data: { data: Game}) => {
        setData(data.data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) {
    console.log('no data')
    return <p className="text-red">No game data</p>
  }

  return (
        <div>
          <h1 className="text-[5.2rem] font-extrabold tracking-tight text-blue-300 md:text-[10rem]">
            {data?.playerCount?.toLocaleString(undefined)}
          </h1>
          <h2 className="pr-2 text-right text-xl font-bold -mt-6 md:-mt-12">{data?.playerCountTitle}</h2>
        </div>
  )
}