import { GameCard } from '@/components/game-card'
import { getHomepageGames } from '@/data/steam'

export default async function HomePage() {
  const homepageGameIds = await getHomepageGames()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white dark:bg-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div>
          <h1 className="text-8xl font-extrabold tracking-tight text-red-300 md:text-[8rem]">
            28,378
          </h1>
          <h2 className="pr-2 text-right text-xl font-bold">Guilty Gears</h2>
        </div>
        <div className="flex flex-col md:grid md:gap-x-6">
          <GameCard steamId={'1384160'} className="md:col-span-2" />
          {homepageGameIds.map(
            (steamId) =>
              steamId !== '1384160' && (
                <GameCard steamId={steamId} className="" />
              )
          )}
        </div>
      </div>
    </main>
  )
}
