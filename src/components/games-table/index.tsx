// Import necessary components and libraries
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { prisma } from '@/server/db'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

// This component fetches game data and renders the GamesTable component
export async function GamesTableContainer({
  className,
}: {
  className?: string
}) {
  'use server'
  const gamesSortedByPlayers = await prisma.games.findMany({
    orderBy: {
      players: 'desc',
    },
  })

  return <GamesTable className={className} games={gamesSortedByPlayers} />
}

// The GamesTable component, now receiving fetched games as props
async function GamesTable({
  className,
  games,
}: {
  className?: string
  games: {
    steam_id: bigint
    name: string | null
    players: bigint
    last_updated: bigint | null
    image_link: string | null
    accolade: bigint | null
  }[]
}) {
  return (
    <div className="w-screen px-8 pt-12 md:max-w-[800px] md:px-0">
      <Card className={`md:px-8 pt-4 ${className}`}>
        <CardContent>
          <CardHeader>
            <CardTitle className="text-3xl text-left">All Games</CardTitle>
          </CardHeader>
          <Table>
            <TableCaption>updates hourly</TableCaption>
            <TableBody>
              {games.map((game) => (
                <TableRow
                  key={game.steam_id + '-table-row'}
                  className="text-neutral-400"
                >
                  <TableCell className="text-white max-w-[130px]">
                    {game.name}
                  </TableCell>
                  <TableCell className="text-lime-400 text-right md:pr-4 font-bold text-xl">
                    {game.players.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-lime-400 underline text-center w-0">
                    <a
                      href={`https://steamcharts.com/app/${game.steam_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant={'outline'}
                        className="bg-black text-white"
                      >
                        Charts
                      </Button>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
