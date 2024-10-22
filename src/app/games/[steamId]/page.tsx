import ContentSection from '@/components/content-section'
import { NicerGameCard } from '@/components/nicer-game-card'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import { getGameData } from '@/server/data/steam'
import { getBannerImageURL } from '@/server/data/steam'
import { TwitterEmbed } from './twitter-embed'

export default async function Game({
  params,
}: {
  params: { steamId: string }
}) {
  const { steamId: id } = params
  const steamId = Number(id)
  const imageUrl = await getBannerImageURL({ steamId })
  const platforms = ['PC', 'PS5']
  const wiki = 'linktowiki'
  const GBVS_TWITTER = 'gbvs_official'
  const TEKKEN_TWITTER = 'TEKKEN'

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white dark:bg-black">
      <ContentSection>
        <div className="flex flex-row gap-x-4">
          {/* <div className="bg-cover">
            <Image
              width={500}
              height={600}
              className={'m-4'}
              src={imageUrl}
              alt={''}
            />
          </div> */}
          <div className="hidden md:flex w-42 items-end justify-end pb-4">
            {imageUrl && (
              <img
                className={
                  'object-cover p-0 h-72 border-[1px] border-neutral-700'
                }
                src={imageUrl}
                alt={''}
              />
            )}
          </div>
          <NicerGameCard
            key={steamId}
            steamId={steamId}
            link={false}
            image={false}
          />
        </div>
        <Card className="flex flex-col-reverse md:flex-row min-h-96">
          <div className="flex flex-col gap-2 p-4">
            <Button size={'lg'} variant={'outline'}>
              <a href={`https://steamcharts.com/app/${steamId}/`}>
                Steam Charts
              </a>
            </Button>
            {platforms.map((plat) => (
              <Button size={'lg'} key={plat} variant={'outline'}>
                {plat === 'PC' ? (
                  <a href={`https://store.steampowered.com/app/${steamId}/`}>
                    Buy on Steam
                  </a>
                ) : (
                  <>Buy on {plat}</>
                )}
              </Button>
            ))}
            {wiki && (
              <Button size={'lg'} variant={'outline'}>
                Wiki
              </Button>
            )}
          </div>
          <Card className="m-4 flex-column items-center w-full border-0">
            <div className="w-full text-center">
              <TwitterEmbed />
            </div>
          </Card>
        </Card>
      </ContentSection>
    </main>
  )
}
