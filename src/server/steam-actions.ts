import { SupportedGame } from '@/index.enums'
import type { Game, SteamGameResponse } from '@/index'
import mockedGamesData from '@/mocks/game-list.json'
import { prisma } from './db'

const {
  DNF_DUEL,
  GBVSR,
  GG_PLUS_R,
  GG_STRIVE,
  GG_XRD_REV2,
  RIVALS_2,
  SF6,
  SFV,
  SOULCALIBUR_VI,
  TEKKEN_7,
  TEKKEN_8,
  UNI_2,
} = SupportedGame

export async function getPlayerCountTitle({
  steamId,
}: {
  steamId: SupportedGame
}): Promise<{ playerCountTitle: string }> {
  const playerCountTitle: { [K in SupportedGame]: string } = {
    [GG_STRIVE]: 'guilty gears',
    [GG_PLUS_R]: 'guilty gears',
    [GG_XRD_REV2]: 'guilty gears',
    [GBVSR]: 'skyfarers',
    [DNF_DUEL]: 'dungeon fighters',
    [UNI_2]: 'under night players',
    [SF6]: 'street fighters',
    [SFV]: 'street fighters',
    [TEKKEN_7]: 'iron fist entrants',
    [TEKKEN_8]: 'iron fist entrants',
    [SOULCALIBUR_VI]: 'soul warriors',
    [RIVALS_2]: 'rivals brawling',
  }

  return Promise.resolve({ playerCountTitle: playerCountTitle[steamId] })
}

export async function getBannerImageURL({
  steamId,
}: {
  steamId: SupportedGame
}) {
  return Promise.resolve(
    `https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/header.jpg`
  )
}

export async function getGameData({
  steamId,
  path,
  shouldRevalidate = true,
  mocked = false,
}: {
  steamId: SupportedGame
  path: string
  shouldRevalidate?: boolean
  mocked?: boolean
}): Promise<{ data: Game | undefined }> {
  const response = await fetch(
    `http://store.steampowered.com/api/appdetails?appids=${steamId}`
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const steamData: SteamGameResponse = await response.json()
  const originalGameData = steamData[steamId]

  if (mocked) {
    const mock = mockedGamesData[steamId as SupportedGame]

    const mockedGameData: Game = {
      id: String(steamId),
      accolade: 'goodest mock data',
      name: mock.name,
      image: await getBannerImageURL({ steamId }),
      developers: 'mocked_devs',
      playerCount: Number('000000'),
      playerCountTitle: mock.playerCountTitle, //delegate
      releaseDate: mock.releaseDate,
      link: `https://store.steampowered.com/app/${steamId}/`,
    }

    return Promise.resolve({ data: mockedGameData })
  }

  if (!originalGameData?.success) {
    return Promise.resolve({ data: undefined })
  }

  const gameDataFromDB = await prisma.games.findUnique({
    where: {
      steam_id: steamId,
    },
    include: {
      accolades: true,
    },
  })

  if (shouldRevalidate) {
    path
  }

  const data: Game = {
    id: String(gameDataFromDB?.steam_id.toString()),
    accolade: gameDataFromDB?.accolades?.accolade ?? '',
    name: originalGameData?.data.name,
    image:
      gameDataFromDB?.image_link?.toString() ??
      (await getBannerImageURL({ steamId })),
    playerCount: Number(gameDataFromDB?.players),
    developers: originalGameData?.data.developers.join(', '),
    playerCountTitle: (await getPlayerCountTitle({ steamId })).playerCountTitle, //delegate
    releaseDate: originalGameData?.data.release_date,
    link: `https://store.steampowered.com/app/${steamId}/`,
  }

  return Promise.resolve({ data })
}

export async function getHomepageGames(): Promise<{ games: SupportedGame[] }> {
  const topTwoGames = await prisma.games.findMany({
    orderBy: {
      players: 'desc',
    },
    select: {
      steam_id: true,
    },
    take: 2,
  })

  const games: SupportedGame[] = [
    ...topTwoGames.map((game) => Number(game.steam_id)),
    TEKKEN_8,
  ]

  return Promise.resolve({ games })
}

export async function getTotalPlayerCount(): Promise<{
  totalPlayerCount: number
}> {
  const gameData = await prisma.games.aggregate({
    _sum: {
      players: true,
    },
  })

  return Promise.resolve({ totalPlayerCount: Number(gameData._sum.players) })
}

export async function getMostPlayedGameId(): Promise<{
  steamId: SupportedGame
}> {
  const gamesSortedByPlayers = await prisma.games.findMany({
    orderBy: {
      players: 'desc',
    },
  })

  return Promise.resolve({
    steamId: Number(gamesSortedByPlayers?.[0]?.steam_id),
  })
}

export async function getAccolade({ steamId }: { steamId: SupportedGame }) {
  const gameDataFromDB = await prisma.games.findUnique({
    where: {
      steam_id: steamId,
    },
    include: {
      accolades: {
        select: {
          accolade: true, // Only include the 'accolade' field from the 'accolades' table
        },
      },
    },
  })

  return Promise.resolve({ accolade: gameDataFromDB?.accolades?.accolade })
}

export async function getPlayerCount({
  steamId,
}: {
  steamId: SupportedGame
}): Promise<{ playerCount: number }> {
  const game = await prisma.games.findUnique({
    where: {
      steam_id: steamId,
    },
    select: {
      players: true,
    },
  })

  return Promise.resolve({ playerCount: Number(game?.players) })
}
