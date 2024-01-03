import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { prisma } from '@/server/db'
import { revalidatePath } from 'next/cache'

export async function GamesTable({ className }: { className?: string }) {
  const RowsWithData = async () => {
    const gamesSortedByPlayers = await prisma.games.findMany({
      orderBy: {
        players: 'desc', // Order by 'players' in descending order
      },
    })

    revalidatePath('/')

    return gamesSortedByPlayers.map((game) => {
      return (
        <TableRow key={game.steam_id + '-table-row'}>
          <TableCell className="max-w-6 font-medium">
            {gamesSortedByPlayers.indexOf(game) + 1}
          </TableCell>
          <TableCell>{game.name}</TableCell>
          <TableCell className="text-right">
            {game.players > 0
              ? game.players.toLocaleString(undefined)
              : 'Unreleased'}
          </TableCell>
        </TableRow>
      )
    })
  }

  return (
    <div className="w-screen max-w-[400px] px-6 pt-16 md:max-w-[750px] md:px-0">
      <Table className={`${className}`}>
        <TableCaption>updates hourly</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Current Players</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <RowsWithData />
        </TableBody>
      </Table>
    </div>
  )
}
