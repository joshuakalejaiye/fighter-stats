import Banner from '@/components/banner'
import { GameCard } from '@/components/game-card'
import { GamesTable } from '@/components/games-table'
import { getHomepageGames, getMostPlayedGameId, getPlayerCountTitle, getTotalPlayerCount } from '@/server/steam-actions'

// export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const { totalPlayerCount } = await getTotalPlayerCount()
  const { steamId } = await getMostPlayedGameId()
  const { playerCountTitle } = await getPlayerCountTitle( 
    {
      steamId,
    }
  )
  const homepageGames = await getHomepageGames()
  
  const [firstGameId, ...remainingGameIds] = homepageGames

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white dark:bg-black">
      <div className="mt-8 container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
       <Banner playerCountTitle={playerCountTitle} playerCount={totalPlayerCount} />
        <div className="flex flex-col md:grid gap-x-4 gap-y-6 grid-cols-2 grid-rows-2">
        <GameCard key={firstGameId} steamId={steamId} className="md:col-span-2" />
          {remainingGameIds.map(
            (steamId) =>
                <GameCard key={steamId} steamId={steamId}  />
          )}
        </div>
        <div className='pt-16 max-w-[400px] md:max-w-[750px] w-screen px-6 md:px-0'>
          <GamesTable />
        </div>
       <div>
       </div>
      </div>
    </main>
  )
}
