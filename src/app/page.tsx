import PlayerCountBanner from '@/components/player-count-banner'
import { NicerGameCard } from '@/components/nicer-game-card'
import { GamesTable } from '@/components/games-table'
import ContentSection from '@/components/content-section'

export const revalidate = 0

export default async function HomePage() {
  return (
    <>
      <PlayerCountBanner />
      <ContentSection>
        <NicerGameCard steamId={1778820} />
      </ContentSection>
      <GamesTable />
    </>
  )
}
