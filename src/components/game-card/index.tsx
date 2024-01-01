import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getBannerImageURL, getGameData } from '@/server/steam-actions'
import type { SupportedGame } from '@/index.enums'

export async function GameCard({
  steamId,
  className,
}: {
  steamId: SupportedGame | undefined
  className?: string
}) {
  if (!steamId) throw new Error('No steamId');
  
  const gameData = await getGameData({ steamId })
  if (!gameData) return <></>
  
  console.log(gameData)
  const imageUrl = await getBannerImageURL({ steamId })
  const width = 350

  return (
    <div
      key={steamId}
      className={`relative text-white ${className}`}
    >
      <div
        className={`absolute h-[210px] min-w-full md:min-w-[${width}px] rounded-xl bg-cover bg-center`}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <Card className={`relative w-[${width}px] h-[210px]`}>
        <CardHeader>
          <CardTitle className="text-2xl">{gameData?.name}</CardTitle>
          <CardDescription>{gameData?.accolade}</CardDescription>
        </CardHeader>
        <CardContent className="min-h-16">
          {!!gameData?.playerCount && <div className="flex flex-col p-0">
            <p className="text-3xl font-extrabold tracking-tight text-green-500 sm:text-[2em]">
              {gameData?.playerCount?.toLocaleString(undefined)}
            </p>
            <p className="pr-1 text-right text-lg font-bold sm:text-xl">
              {gameData?.playerCountTitle}
            </p>
          </div>}
        </CardContent>
      </Card>
    </div>
  )
}
