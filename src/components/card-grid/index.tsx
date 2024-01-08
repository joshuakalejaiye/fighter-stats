import { GameCard } from '../game-card'
import { prisma } from '@/server/db'

export default async function CardGrid() {
  const [mostPopular] = await prisma.games.findMany({
    orderBy: {
      players: 'desc',
    },
    select: {
      steam_id: true,
    },
    take: 1,
  })

  const onTheRise = await prisma.games.findFirst({
    where: {
      accolades: {
        accolade: 'on the rise',
      },
    },
    select: {
      steam_id: true,
    },
  })

  const mostAnticipated = await prisma.games.findFirst({
    where: {
      accolades: {
        accolade: 'most anticipated',
      },
    },
    select: {
      steam_id: true,
    },
  })

  const firstGameId = Number(mostPopular?.steam_id)
  const secondGameId = Number(onTheRise?.steam_id)
  const thirdGameId = Number(mostAnticipated?.steam_id)

  return (
    <div className="max-w-[800px] min-w-full md:min-w-[700px] flex grid-cols-2 grid-rows-2 flex-col gap-x-4 gap-y-6 mt-14 md:mt-36 md:grid">
      <GameCard
        key={firstGameId}
        steamId={firstGameId}
        className="md:col-span-2"
        imageClassName="-mt-10 min-h-[180px]"
      />
      {[secondGameId, thirdGameId].map((steamId) => (
        <GameCard key={steamId} steamId={steamId} />
      ))}
    </div>
  )
}
