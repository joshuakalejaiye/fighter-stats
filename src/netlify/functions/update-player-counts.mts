import type{ Config } from "@netlify/functions"
import { PrismaClient } from '@prisma/client'
import { env } from '../../env'
import { SupportedGame } from "@/index.enums"
import type { PlayerCountResponse } from "@/index"
const prisma = new PrismaClient()

const getSteamPlayerCount = async ({ steamId }: { steamId: number | string}): Promise<number> => {
    const steamPlayerCountEndpoint = `http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=${env.STEAM_API_KEY}&appid=${steamId}`
    const response = await fetch(steamPlayerCountEndpoint)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: PlayerCountResponse = await response.json()
    return data.response.player_count
}

export default async (req: Request) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { next_run } = await req.json()

    for (const steamId in SupportedGame) {
        await prisma.games.update({
            where: {
                steam_id: Number(steamId),
            }, 
            data: {
               players: await getSteamPlayerCount({ steamId }), 
            }
        })
    }

    console.log("Received event! Next invocation at:", next_run)
}

export const config: Config = {
    schedule: "@hourly"
}

