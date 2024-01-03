import { getTotalPlayerCount } from '@/server/steam-actions'

export default async function Banner() {
  const { totalPlayerCount } = await getTotalPlayerCount()
  // const { steamId } = await getMostPlayedGameId()
  // const { playerCountTitle } = await getPlayerCountTitle(
  //   {
  //     steamId,
  //   }
  // )

  return (
    <div>
      <h1 className="text-[5.2rem] font-extrabold tracking-tight text-blue-300 md:text-[10rem]">
        {totalPlayerCount?.toLocaleString(undefined)}
      </h1>
      <h2 className="-mt-6 pr-2 text-right text-xl font-bold md:-mt-12">
        {'neutral skippers'}
      </h2>
    </div>
  )
}
