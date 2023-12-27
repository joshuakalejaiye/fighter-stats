import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getBannerImageURL, getGameData } from '@/data/steam'

export async function GameCard({
  steamId,
  className,
}: {
  steamId: string
  className?: string
}) {
  const gameData = await getGameData({steamId})
  const imageUrl = await getBannerImageURL({ steamId })
  console.log(gameData)


  return (
    <div
      key={steamId}
      className={`relative max-h-[280px] min-w-[350px] text-white ${className}`}
    >
      <div
        className={`absolute min-h-[280px] min-w-[350px] rounded-xl bg-cover bg-center brightness-50 hover:brightness-100`}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <Card className={`relative mb-4 max-w-[350px]`}>
        <CardHeader>
          <CardTitle className="text-2xl">{gameData?.name}</CardTitle>
          <CardDescription>{gameData?.id}</CardDescription>
        </CardHeader>
        <CardContent className="min-h-16">
          <div className="flex flex-col p-0">
            <p className="text-3xl font-extrabold tracking-tight text-green-500 sm:text-[2em]">
              {gameData?.playerCount?.toLocaleString(undefined)}
            </p>
            <p className="pr-1 text-right text-lg font-bold sm:text-xl">
              {gameData?.playerCountTitle}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
