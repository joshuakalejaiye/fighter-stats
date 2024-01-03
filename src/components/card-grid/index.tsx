import { GameCard } from "../game-card"
import { prisma } from "@/server/db"
import { TEKKEN_8 } from "@/index.enums"
import { revalidatePath } from "next/cache"

export default async function HomePage() {
    "use server"
    const [one, two] = await prisma.games.findMany({
      orderBy: {
        players: 'desc',
      },
      select: {
        steam_id: true,
      },
      take: 2,
    })

    revalidatePath('/')
  
    const firstGameId = Number(one?.steam_id)
    const secondGameId = Number(two?.steam_id)

    return (
      <div className="max-w-[800px] flex grid-cols-2 grid-rows-2 flex-col gap-x-4 gap-y-6 mt-16 md:mt-36 md:grid">
          <GameCard
            key={firstGameId}
            steamId={firstGameId}
            className="md:col-span-2"
            imageClassName="-mt-10 min-h-[180px]"
          />
          {[secondGameId, TEKKEN_8].map((steamId) => (
            <GameCard key={steamId} steamId={steamId} />
          ))} 
     </div>
    )
}
  