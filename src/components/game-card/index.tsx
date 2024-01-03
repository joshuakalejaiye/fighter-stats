import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getGameData } from '@/server/steam-actions'
import type { SupportedGame } from '@/index.enums'

export const dynamic = 'force-dynamic'
export async function GameCard({
  steamId,
  className,
}: {
  steamId?: SupportedGame
  className?: string
}) {
  if (!steamId) return <></>
  const { data } = await getGameData({ steamId, path: '/' })
  const width = 350


  return (
    <div key={steamId} className={`relative text-white ${className}`}>
      <div
        className={`absolute h-[210px] min-w-full md:min-w-[${width}px] rounded-xl bg-cover bg-center`}
        style={{
          backgroundImage: `url(${data?.image})`,
        }}
      ></div>
      <Card className={`relative w-[${width}px] h-[210px]`}>
        <CardHeader>
          <CardTitle className="text-2xl">{data?.name}</CardTitle>
          <CardDescription>{data?.accolade}</CardDescription>
        </CardHeader>
        <CardContent className="min-h-16">
          {!!data?.playerCount && (
            <div className="flex flex-col p-0">
              <p className="text-3xl font-extrabold tracking-tight text-green-500 sm:text-[2em]">
                {data?.playerCount?.toLocaleString(undefined)}
              </p>
              <p className="pr-1 text-right text-lg font-bold sm:text-xl">
                {data?.playerCountTitle}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
