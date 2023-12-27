"use server"

import { env } from '@/env'
import mockedGamesData from './mocks/game-list.json'
import { DNF_DUEL, GBVSR, GG_PLUS_R, GG_STRIVE, GG_XRD_REV2, RIVALS_2, SF6, SFV, SOULCALIBUR_VI, SupportedGame, TEKKEN_7, TEKKEN_8, UNI_2 } from '@/index.enums'
import { abort } from 'process'

export async function getHomepageGames(): Promise<SupportedGame[]> {
    const { GBVSR, SF6, TEKKEN_7 } = SupportedGame
    const games: SupportedGame[] = [SF6, GBVSR, TEKKEN_7]

    return Promise.resolve(games)
}

export async function getBannerImageURL({steamId}: { steamId: SupportedGame }) {
    return Promise.resolve(`https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/header.jpg`)
}

export async function getBannerData(): Promise<{totalPlayerCount: number, playerCountTitle: string}> {
    const gamesData = await getGamesData()

    // DO NOT LEAVE THIS AS A MANUAL CALCULATION ON NAVIGATION
    // THIS SHOULD BE CALCULATED FROM THE VALUES IN THE DB.
    return Promise.resolve({totalPlayerCount: gamesData.totalPlayerCount ?? 0, playerCountTitle: gamesData.data[0]?.playerCountTitle ?? ''})
}

export async function getPlayerCount({steamId}: { steamId: SupportedGame }) {
    const response = await fetch(`http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=${env.STEAM_API_KEY}&appid=${steamId}`)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: PlayerCountResponse = await response.json()
    
    const playerCount = data.response.player_count

    //DO NOT LEAVE THIS UNCACHED FOREVER, IT NEEDS TO BE IN A KV DATABASE THAT IS UPDATED EVERY HOUR
    return Promise.resolve(playerCount)
}

export async function getPlayerCountTitle({steamId}: { steamId: SupportedGame }) {
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
        [RIVALS_2]: 'rivals brawling'
    };

    return Promise.resolve(playerCountTitle[steamId])
}

async function getAccolades() {
    
    //TODO: Generate these programmatically
    const accolades: { [K in SupportedGame]?: string } = {
        [GBVSR]: 'fastest growing',
        [SF6]: 'most popular',
        [GG_PLUS_R]: 'most dedicated players',
    };

    return Promise.resolve(accolades)
}

export async function getAccolade({steamId}: { steamId: SupportedGame }) {
    const accolades = await getAccolades()
    return Promise.resolve(accolades[steamId])
}

export async function getGameData({steamId, mocked = false}: { steamId: SupportedGame, mocked?: boolean }): Promise<Game | undefined> {
    const response = await fetch(`http://store.steampowered.com/api/appdetails?appids=${steamId}`)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: SteamGameResponse = await response.json()
    const originalGameData = data[steamId]

    if (mocked) {
        const mock = mockedGamesData[steamId as SupportedGame]

        const mockedGameData: Game = {
            id: String(steamId),
            accolade: 'goodest mock data',
            name:  mock.name,
            image: await getBannerImageURL({steamId}),
            playerCount: Number('000000'),
            playerCountTitle: mock.playerCountTitle, //delegate
            releaseDate: mock.releaseDate,
            link: `https://store.steampowered.com/app/${steamId}/`,
        }
    
        return Promise.resolve(mockedGameData)
    }

    if (!originalGameData?.success) { 
        return Promise.resolve(undefined)
    }

    const gameData: Game =  {
        id: String(steamId),
        accolade: await getAccolade({steamId}),
        name:  originalGameData?.data.name,
        image: await getBannerImageURL({steamId}),
        playerCount: await getPlayerCount({steamId}),
        playerCountTitle: await getPlayerCountTitle({steamId}), //delegate
        releaseDate: originalGameData?.data.release_date,
        link: `https://store.steampowered.com/app/${steamId}/`
    }

    return Promise.resolve(gameData)
}

export async function getGamesData(): Promise<{
    totalPlayerCount: number,
    data: Game[]
}> {
    let totalPlayerCount = 0; 
    let highestRecorded = 0; 

    const gamesData: Game[] = []

    for (const id in SupportedGame) { 
        const steamId: SupportedGame = Number(id)
        const playerCount = await getPlayerCount({ steamId })

        if (steamId && playerCount) {
            totalPlayerCount += playerCount
            const gameData = await getGameData({steamId})
            
            if (gameData) {
                gamesData.push(gameData)
            }

            if (playerCount > highestRecorded) {
                highestRecorded = playerCount
            }
        }
    }

    gamesData.sort((a, b) => { 
        return b.playerCount - a.playerCount
    })

    return { totalPlayerCount, data: gamesData }
}

