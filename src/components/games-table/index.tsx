import { getGamesData } from "@/actions"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
   
  export async function GamesTable({className}: {className?: string}) {
    const { data } = await getGamesData()

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
        { data.map((gameData) => {
              return (
                <TableRow key={gameData.id + '-table-row'}>
                <TableCell className="font-medium max-w-6">{data.indexOf(gameData) + 1}</TableCell>
                <TableCell>{gameData?.name}</TableCell>
                <TableCell  className="text-right">{gameData?.playerCount.toLocaleString(undefined)}</TableCell>
                </TableRow>
            )
        })}
        </TableBody>
      </Table>
    )
  }