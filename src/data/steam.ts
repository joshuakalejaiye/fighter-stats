import { env } from '@/env'
import mockedGamesData from '../mocks/game-list.json'

export async function getHomepageGames(): Promise<SupportedGame[]> {
    // needs to be an object that not only says what games to render but gives data about them
    return Promise.resolve(['2157560', '1364780', '1778820'])
}

export async function getBannerImageURL({steamId}: { steamId: string }) {
    return Promise.resolve(`https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/header.jpg`)
}

export async function getPlayerCount({steamId}: { steamId: string }) {
    const response = await fetch(`http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=${env.STEAM_API_KEY}&appid=${steamId}`)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: PlayerCountResponse = await response.json()
    
    const playerCount = data.response.player_count

    //DO NOT LEAVE THIS UNCACHED FOREVER, IT NEEDS TO BE IN A KV DATABASE THAT IS UPDATED EVERY HOUR
    return Promise.resolve(playerCount)
}

export async function getPlayerCountTitle({steamId}: { steamId: string }) {
    const playerCountTitle: Record<SupportedGame, string> = {
        '1384160': 'guilty gears',
        '348550': 'guilty gears',
        '520440': 'guilty gears',
        '2157560': 'skyfarers',
        '1216060': 'dungeon fighters',
        '2076010': 'under night players',
        '1364780': 'out on the streets',
        '310950': 'on the streets of V',
        '389730': 'iron fist entrants',
        '1778820': 'iron fist entrants',
        '544750': 'soul warriors',
        '2217000': 'rivals brawling'
    };

    return Promise.resolve(playerCountTitle[steamId as SupportedGame])
}

export async function getGameData({steamId, mocked = false}: { steamId: string, mocked?: boolean }) {
    const response = await fetch(`http://store.steampowered.com/api/appdetails?appids=${steamId}`)
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: SteamGameResponse = await response.json()
    const originalGameData = data[steamId]

    if (mocked) {
        const mock = mockedGamesData[steamId as SupportedGame] as Game

        const mockedGameData =  {
            id: steamId,
            name:  mock.name,
            image: await getBannerImageURL({steamId}),
            playerCount: '000000',
            playerCountTitle: mock.playerCountTitle, //delegate
            releaseDate: mock.release_date,
            link: `https://store.steampowered.com/app/${steamId}/`
        }
    
        return Promise.resolve(mockedGameData)
    }

    if (!originalGameData?.success) { 
        return Promise.resolve(undefined)
    }

    const gameData =  {
        id: steamId,
        name:  originalGameData?.data.name,
        image: await getBannerImageURL({steamId}),
        playerCount: await getPlayerCount({steamId}),
        playerCountTitle: await getPlayerCountTitle({steamId}), //delegate
        releaseDate: originalGameData?.data.release_date,
        link: `https://store.steampowered.com/app/${steamId}/`
    }

    return Promise.resolve(gameData)
}