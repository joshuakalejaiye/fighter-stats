import type { SupportedGame } from '@/index.enums'
import { prisma } from "@/server/db"

export const dynamic = 'force-dynamic'
export async function GET(request: Request, res: { params: { steamId: string }}) {
    const steamId = Number(res.params.steamId)
    if (!steamId || isNaN(steamId)) {
        return Response.json({ data: undefined })
    }

    const data = await getPlayerCount({ steamId })
   
    return Response.json({ data })
}

export async function getPlayerCount({steamId}: { steamId: SupportedGame }): Promise<{ playerCount: number }> {
    const game = await prisma.games.findUnique({
        where: {
            steam_id: steamId,
        },
        select: {
            players: true,
        }
    })

    return Promise.resolve({ playerCount: Number(game?.players)})
}