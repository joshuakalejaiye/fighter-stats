import { GameCard } from '@/components/game-card'
import { getHomepageGames, getBannerData, getPlayerCountTitle } from '@/actions'

export default async function HomePage() {
  const [firstGameId, ...remainingGameIds]  = await getHomepageGames()
  const { totalPlayerCount, mostPopularId } = await getBannerData()
  const bannerPlayerCountTitle = await getPlayerCountTitle({ steamId: mostPopularId })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white dark:bg-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div>
          <h1 className="text-8xl font-extrabold tracking-tight text-red-300 md:text-[8rem]">
            {totalPlayerCount.toLocaleString(undefined)}
          </h1>
          <h2 className="pr-2 text-right text-xl font-bold">{bannerPlayerCountTitle}</h2>
        </div>
        <div className="flex flex-col md:grid gap-x-4 gap-y-6 grid-cols-2 grid-rows-2">
        <GameCard key={firstGameId} wide steamId={firstGameId} className="md:col-span-2" />
          {remainingGameIds.map(
            (steamId) =>
                <GameCard key={steamId} steamId={steamId} className="" />
          )}
        </div>
      </div>
    </main>
  )
}
