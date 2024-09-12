import type { Game } from '@/index'
import { SupportedGame } from '@/index.enums'
import { getGameData } from '@/server/data/steam'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data: Game[] = []

  for (const game in SupportedGame) {
    const steamId = Number(game)

    if (isNaN(steamId)) {
      continue
    }

    const { data: gameData } = await getGameData({ steamId })

    if (gameData) {
      data.push(gameData)
    }
  }

  return Response.json({ data })
}
