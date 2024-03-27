import ContentSection from '@/components/content-section'
import { NicerGameCard } from '@/components/nicer-game-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
// import { getBannerImageURL } from '@/server/data/steam'
// import Image from 'next/image'

export default async function Game({
  params,
}: {
  params: { steamId: string }
}) {
  const { steamId: id } = params
  const steamId = Number(id)
  // const imageUrl = await getBannerImageURL({ steamId })
  const platforms = ['PC', 'PS5']
  const wiki = 'linktowiki'

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white dark:bg-black">
      <ContentSection>
        <div className="flex flex-row-reverse">
          {/* <div className="bg-cover">
            <Image
              width={500}
              height={600}
              className={'m-4 '}
              src={imageUrl}
              alt={''}
            />
          </div> */}
          <NicerGameCard
            key={steamId}
            steamId={steamId}
            imageClassName="-mt-10 min-h-[180px]"
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
          <div className="p-4 flex items-center w-full">
            <div className="w-full text-center">twitter feed</div>
          </div>
        </Card>
      </ContentSection>
    </main>
  )
}
