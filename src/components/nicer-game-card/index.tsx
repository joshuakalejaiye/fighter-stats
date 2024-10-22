import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getGameData } from '@/server/data/steam'
import type { SupportedGame } from '@/index.enums'
import { type ReactNode } from 'react'
import Link from 'next/link'

export async function NicerGameCard({
  steamId,
  className,
  imageClassName,
  image = true,
  link = true,
}: {
  steamId?: SupportedGame
  className?: string
  imageClassName?: string
  image?: boolean
  link?: boolean
}) {
  if (!steamId) return <></>
  const { data } = await getGameData({ steamId })
  const gameComingSoon = data?.releaseDate.coming_soon
  const hasPlayers =
    data?.playerCount && data?.playerCount > 0 && !gameComingSoon

  const allTags = data?.tags && [data?.accolade, ...data?.tags]
  const hasAccoladesOrTags = data?.tags ?? (data?.accolade && allTags)

  const Container = (props: {
    href: string
    className: string
    children: ReactNode
  }) =>
    link ? (
      <Link {...props}>{props.children}</Link>
    ) : (
      <div {...props}>{props.children}</div>
    )

  const hiddenImageStyle = `absolute md:hidden -top-16 left-[0.5px] right-[0.5px] min-h-[120px] bg-cover bg-center ${imageClassName}`
  const imageStyle = `absolute -top-16 left-[0.5px] right-[0.5px] min-h-[120px] bg-cover bg-center ${imageClassName}`

  return (
    <Container
      href={`/games/${steamId}`}
      key={steamId}
      className={`relative text-white min-w-full md:min-w-[350px] md:max-w-[390px] ${className} mt-16 max-h-[280px] pb-4`}
    >
      <div
        className={!image ? hiddenImageStyle : imageStyle}
        style={{
          backgroundImage: `url(${data?.image})`,
        }}
      ></div>
      <Card
        className={`relative min-w-full pb-4 ${
          hasPlayers ? 'min-h-[235px]' : ''
        }`}
      >
        <CardHeader className={`h-0 pt-0`}></CardHeader>
        <CardContent className="min-h-16">
          <CardTitle className="text-3xl leading-7 min-w-full md:min-w-[350px] pr-2">
            {data?.name}
          </CardTitle>
          <CardDescription className="leading-7 ml-[0.2px] mb-[3px]">
            {data?.developers}
          </CardDescription>
          <div
            id={`${data?.id}-card-tags`}
            className="flex gap-2 -ml-1 flex-wrap"
          >
            {hasAccoladesOrTags &&
              allTags?.map(
                (tag) =>
                  tag && (
                    <div
                      key={`${data?.name}-${tag}`}
                      className="bg-black px-2 -mt-[2px] border border-white"
                    >
                      <p className="font-bold text-md">{tag?.toUpperCase()}</p>
                    </div>
                  )
              )}
          </div>
          {gameComingSoon && (
            <p className="uppercase leading-7 bottom-2 absolute text-lime-400 text-sm font-bold">
              {data?.releaseDate.date ?? 'Coming Soon'}
            </p>
          )}
        </CardContent>
        {hasPlayers ? (
          <CardFooter className="flex flex-col pb-20 mb-1">
            <div className="text-8xl text-black font-bold bg-lime-400 w-full absolute text-center h-16">
              <div className="text-black -m-4">
                {data?.playerCount.toLocaleString()}
              </div>
              <p className="text-center pl-52 text-2xl right-24 font-bold text-lime-400">
                players
              </p>
            </div>
          </CardFooter>
        ) : null}
      </Card>
    </Container>
  )
}