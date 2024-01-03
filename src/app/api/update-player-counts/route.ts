import { env } from 'src/env'
import { SupportedGame } from '@/index.enums'
import type { PlayerCountResponse } from '@/index'
import { prisma } from '@/server/db'
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const getSteamPlayerCount = async ({
  steamId,
}: {
  steamId: number | string
}): Promise<number> => {
  const steamPlayerCountEndpoint = `http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=${env.STEAM_API_KEY}&appid=${steamId}`
  const response = await fetch(steamPlayerCountEndpoint)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: PlayerCountResponse = await response.json()
  return data.response.player_count
}

export async function GET(request: NextRequest) {
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
          last_updated: last_updated,
        },
      })
    }
  }

  const date = new Date(last_updated * 1000); // convert timestamp to milliseconds and construct Date object

  console.log('Invoked at:', date)
  
  return NextResponse.json(
    {
      body: request.body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    },
  );
}