import { GameCard } from '@/components/game-card'
import { getHomepageGames } from '@/actions'
import { GamesTable } from '@/components/games-table'
import Banner from '@/components/banner'

export default async function HomePage() {
  const [firstGameId, ...remainingGameIds]  = await getHomepageGames()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white dark:bg-black">
      <div className="mt-16 container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
       <Banner />
        <div className="flex flex-col md:grid gap-x-4 gap-y-6 grid-cols-2 grid-rows-2">
        <GameCard key={firstGameId} steamId={firstGameId} className="md:col-span-2" />
          {remainingGameIds.map(
            (steamId) =>
                <GameCard key={steamId} steamId={steamId}  />
          )}
        </div>
        <div className='mt-16 max-w-[400px] md:max-w-[750px] w-screen px-6 md:px-0'>
        <GamesTable />
        </div>
       <div>
       </div>
      </div>
    </main>
  )
}
