import Banner from '@/components/banner'
import { GameCard } from '@/components/game-card'
import { GamesTable } from '@/components/games-table'
import {
  getHomepageGames,
  getMostPlayedGameId,
  getPlayerCountTitle,
  getTotalPlayerCount,
} from '@/server/steam-actions'

export default async function HomePage() {
  const { totalPlayerCount } = await getTotalPlayerCount()
  const { steamId } = await getMostPlayedGameId()
  const { playerCountTitle } = await getPlayerCountTitle({
    steamId,
  })
  const homepageGames = await getHomepageGames()

  const [firstGameId, ...remainingGameIds] = homepageGames

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white dark:bg-black">
      <div className="container mt-8 flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Banner steamId={steamId} />
        <div className="flex grid-cols-2 grid-rows-2 flex-col gap-x-4 gap-y-6 md:grid">
          <GameCard
            key={firstGameId}
            steamId={steamId}
            className="md:col-span-2"
          />
          {remainingGameIds.map((steamId) => (
            <GameCard key={steamId} steamId={steamId} />
          ))}
        </div>
        <div className="w-screen max-w-[400px] px-6 pt-16 md:max-w-[750px] md:px-0">
          <GamesTable />
        </div>
        <div></div>
      </div>
    </main>
  )
}
