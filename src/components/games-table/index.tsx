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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

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
        <TableRow key={game.steam_id + '-table-row'} className='text-neutral-400'>
          <TableCell className="max-w-6 font-medium">
            {gamesSortedByPlayers.indexOf(game) + 1}
          </TableCell>
          <TableCell className='text-white'>{game.name}</TableCell>
          <TableCell className="text-lime-400">
            {game.players > 0
              ? game.players.toLocaleString(undefined)
              : 'Unreleased'}
          </TableCell>
        </TableRow>
      )
    })
  }

  return (
    <div className="w-screen px-6 pt-12 md:max-w-[800px] md:px-0">
       <Card className={``}>
  <CardHeader className={''}>
    <CardTitle className='text-3xl text-center'>Tracked Games</CardTitle>
  </CardHeader>
  <CardContent className="">
  <Table className={`${className}`}>
        <TableCaption>updates hourly</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className='text-white'>Name</TableHead>
            <TableHead className='text-white'>Current Players</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <RowsWithData />
        </TableBody>
      </Table>
  </CardContent>
</Card>
      
      
    </div>
  )
}
