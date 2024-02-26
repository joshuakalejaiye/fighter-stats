import PlayerCountBanner from '@/components/player-count-banner'
import CardGrid from '@/components/card-grid'
import { GamesTable } from '@/components/games-table'

export const revalidate = 0

export default async function HomePage() {
  return (
    <>
      <PlayerCountBanner />
      <CardGrid />
      <GamesTable />
    </>
  )
}
