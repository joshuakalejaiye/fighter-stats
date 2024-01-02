import type { Config } from "@netlify/functions"
import { env } from 'src/env'
import { SupportedGame } from "@/index.enums"
import type { PlayerCountResponse } from "@/index"
import { prisma } from "@/server/db"

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
    const last_updated = Date.now()

    for (const game in SupportedGame) {
        const steamId = Number(game)

        if (isNaN(steamId)) {
            continue
        }

        if (steamId) {
            await prisma.games.update({
                where: {
                    steam_id: Number(steamId),
                }, 
                data: {
                    players: await getSteamPlayerCount({ steamId }), 
                    last_updated: last_updated
                }
            })
        }
    }
    
    console.log("Received event! Next invocation at:", next_run, last_updated)
}

export const config: Config = {
    schedule: "@hourly"
}

