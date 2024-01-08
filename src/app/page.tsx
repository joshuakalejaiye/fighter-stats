import Banner from '@/components/banner'
import CardGrid from '@/components/card-grid'
import { GamesTable } from '@/components/games-table'

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white dark:bg-black">
      <div className="container mt-6 flex flex-col items-center justify-center gap-12 px-4 py-16 min-w-full">
        <Banner />
        <CardGrid />
        <GamesTable />
      </div>
    </main>
  )
}
