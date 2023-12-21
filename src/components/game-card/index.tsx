import * as React from 'react'
import getGamesList from '../../mocks/game-list.json'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

export function GameCard({ steamId = '23' }: { steamId: string }) {
  const games: Game[] = getGamesList.data
  const game = games?.find((data) => data.steamId === steamId)
  if (!game) return <></>

  return (
    <Card className="mb-4 w-[350px]">
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>{game.steamId}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          width={'100'}
          height={'100'}
          src={`https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/header.jpg`}
          alt={`banner image of ${steamId}`}
        />
      </CardContent>
      <CardFooter className="flex h-full w-full justify-end text-right align-middle">
        <div className="flex flex-col p-0">
          <p className="text-xl font-extrabold tracking-tight text-red-300 sm:text-[2em]">
            28,378
          </p>
          <p className="pr-1 text-right text-xl font-bold">
            {game.playerCountTitle}
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
