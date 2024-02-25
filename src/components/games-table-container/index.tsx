import { prisma } from '@/server/db'
import { GamesTable } from '../games-table'

export async function GamesTableContainer({
  className,
}: {
  className?: string
}) {
  const gamesSortedByPlayers = await prisma.games.findMany({
    orderBy: {
      players: 'desc',
    },
  })

  return <GamesTable className={className} games={gamesSortedByPlayers} />
}
