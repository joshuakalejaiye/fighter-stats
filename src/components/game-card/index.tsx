import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getGameData } from '@/server/steam-actions'
import type { SupportedGame } from '@/index.enums'

export const dynamic = 'force-dynamic'
export async function GameCard({
  steamId,
  className,
  imageClassName
}: {
  steamId?: SupportedGame
  className?: string
  imageClassName?: string
}) {
  if (!steamId) return <></>
  const { data } = await getGameData({ steamId, path: '/' })
  const hasPlayers = data?.playerCount && data?.playerCount > 0
  const gameComingSoon = data?.releaseDate.coming_soon

  return (
    <a href={data?.link} key={steamId} className={`relative text-white min-w-full ${className} mt-16 max-h-[230px] md:pb-10`}>
      <div
        className={`absolute -top-16 left-[0.5px] right-[0.5px] min-h-[120px] md:-top-24 rounded-xl bg-cover bg-center ${imageClassName}`}
        style={{
          backgroundImage: `url(${data?.image})`,
        }}
      ></div>
      <Card className={`relative min-w-full pb-4 ${hasPlayers ? 'min-h-[190px]': ''}`}>
        <CardHeader className={`h-0 pt-0`}>
        </CardHeader>
        <CardContent className="min-h-16">
        <CardTitle className="text-3xl leading-7">
        {data?.name}
        


        </CardTitle>
          <CardDescription className='leading-7 ml-[0.2px] mb-[3px]'>{data?.developers}</CardDescription>
          <div 
          id={`${data?.id}-card-tags`} 
          className='flex gap-2 -ml-1' >
            <div className='bg-black px-2 -mt-[2px] rounded-md'>
              <p className='font-bold text-md'>{data?.accolade?.toUpperCase()}</p>
            </div>
          </div>
        {gameComingSoon && <p className='leading-7 bottom-2 absolute text-lime-400 text-sm font-bold'>{data?.releaseDate.date}</p>}        </CardContent>
        { hasPlayers ? 
        <CardFooter className='flex absolute bottom-0 px-6 pb-3 gap-[0.3rem] text-lime-400'>
          <p className='text-3xl font-bold'>
            {data?.playerCount.toLocaleString()} 
          </p>
          <p className='pt-2 text-lg font-bold'>
            players
          </p> 
        </CardFooter>  : null }
      </Card>
    </a>
  )
}
