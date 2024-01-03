import { getBannerImageURL } from '@/server/steam-actions'

export const dynamic = 'force-dynamic'
export async function GET(
  request: Request,
  res: { params: { steamId: string } }
) {
  const steamId = Number(res.params.steamId)
  if (!steamId || isNaN(steamId)) {
    return Response.json({ data: undefined })
  }

  const data = await getBannerImageURL({ steamId })

  return Response.json({ data })
}
