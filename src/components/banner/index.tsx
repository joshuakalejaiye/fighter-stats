import { getMostPlayedGameId, getPlayerCountTitle, getTotalPlayerCount } from '@/server/steam-actions'

export default async function Banner() {
  const { playerCountTitle } = await getPlayerCountTitle({
    steamId: (await getMostPlayedGameId()).steamId
  })

  const { totalPlayerCount } = await getTotalPlayerCount()

  return (
        <div>
          <h1 className="text-[5.2rem] font-extrabold tracking-tight text-blue-300 md:text-[10rem]">
            {totalPlayerCount.toLocaleString(undefined)}
          </h1>
          <h2 className="pr-2 text-right text-xl font-bold -mt-6 md:-mt-12">{playerCountTitle}</h2>
        </div>
  )
}