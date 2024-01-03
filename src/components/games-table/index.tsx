import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { prisma } from "@/server/db";

export async function GamesTable({className}: {className?: string}) {

    const HydratedTableRow = async () => {
      "use server"
    
      const gamesSortedByPlayers = await prisma.games.findMany({
          orderBy: {
              players: 'desc' // Order by 'players' in descending order
          }    
      });

      return gamesSortedByPlayers.map((game) => {
        return (
          <TableRow key={game.steam_id + '-table-row'}>
          <TableCell className="font-medium max-w-6">{gamesSortedByPlayers.indexOf(game) + 1}</TableCell>
          <TableCell>{game.name}</TableCell>
          <TableCell  className="text-right">{game.players > 0 ? game.players.toLocaleString(undefined) : 'Unreleased'}</TableCell>
          </TableRow>
        )
      })
    }


    return (
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
        <HydratedTableRow />
        </TableBody>
      </Table>
    )
}