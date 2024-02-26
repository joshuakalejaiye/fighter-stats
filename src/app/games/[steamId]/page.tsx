import ContentSection from '@/components/content-section'
import { GameCard } from '@/components/game-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default async function Game({
  params,
}: {
  params: { steamId: string }
}) {
  const { steamId } = params

  const platforms = ['PC', 'PS5']
  const wiki = 'linktowiki'

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white dark:bg-black">
      <ContentSection>
        <div className="pb-4">
          <GameCard
            key={steamId}
            steamId={Number(steamId)}
            imageClassName="-mt-10 min-h-[180px]"
            link={false}
          />
        </div>
        <Card className="flex flex-col-reverse md:flex-row">
          <div className="flex flex-col gap-2 p-4">
            <Button variant={'outline'}>
              <a href={`https://store.steampowered.com/app/${steamId}/`}>
                Steam Page
              </a>
            </Button>
            {wiki && <Button variant={'outline'}>Wiki</Button>}
            {platforms.map((plat) => (
              <Button key={plat} variant={'outline'}>
                Buy on {plat}
              </Button>
            ))}
          </div>
          <div className="p-4 flex items-center w-full">
            <div className="w-full text-center">twitter feed</div>
          </div>
        </Card>
      </ContentSection>
    </main>
  )
}
