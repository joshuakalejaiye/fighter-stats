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
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=""></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Current Players</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        { data.map((gameData) => {
              return (
                <TableRow key={gameData.id + '-table-row'}>
                <TableCell className="font-medium">{data.indexOf(gameData) + 1}</TableCell>
                <TableCell>{gameData?.name}</TableCell>
                <TableCell>{gameData?.playerCount}</TableCell>
                </TableRow>
            )
        })
        
        }
        </TableBody>
      </Table>
    )
  }