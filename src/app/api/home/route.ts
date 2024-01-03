import {
  getHomepageGames,
  getMostPlayedGameId,
  getPlayerCountTitle,
  getTotalPlayerCount,
} from '@/server/steam-actions'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { totalPlayerCount } = await getTotalPlayerCount()
  const { steamId } = await getMostPlayedGameId()
  const { playerCountTitle } = await getPlayerCountTitle({
    steamId,
  })
  const homepageGames = await getHomepageGames()

  return Response.json({
    data: {
      homepageGames,
      bannerData: {
        totalPlayerCount,
        playerCountTitle,
      },
    },
  })
}
