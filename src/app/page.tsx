import PlayerCountBanner from '@/components/player-count-banner'
import CardGrid from '@/components/card-grid'
import { GamesTableContainer } from '@/components/games-table-container'

export const revalidate = 0

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white dark:bg-black">
      <div className="container mt-6 flex flex-col items-center justify-center gap-12 px-4 py-16 min-w-full">
        <PlayerCountBanner />
        <CardGrid />
        <GamesTableContainer />
        <footer>
          <a
            className="text-neutral-200 text-sm underline"
            href={'https://www.joshuakal.dev'}
            target="_blank"
          >
            made by joshuakalejaiye
          </a>
        </footer>
      </div>
    </main>
  )
}
