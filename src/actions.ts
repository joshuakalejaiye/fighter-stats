"use server"

import { env } from '@/env'
import mockedGamesData from './mocks/game-list.json'
import { DNF_DUEL, GBVSR, GG_PLUS_R, GG_STRIVE, GG_XRD_REV2, RIVALS_2, SF6, SFV, SOULCALIBUR_VI, SupportedGame, TEKKEN_7, TEKKEN_8, UNI_2 } from '@/index.enums'

export async function getBannerPlayerCountTitle() { 
    console.log(typeof window === 'undefined')
    // TODO: pick this based on highest value in document db
    return Promise.resolve(await getPlayerCountTitle({steamId: SF6}))
}

export async function getHomepageGames(): Promise<SupportedGame[]> {
    const { GBVSR, SF6, TEKKEN_7 } = SupportedGame
    const games: SupportedGame[] = [GBVSR, SF6, TEKKEN_7]

    return Promise.resolve(games)
}

export async function getBannerImageURL({steamId}: { steamId: SupportedGame }) {
    return Promise.resolve(`https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/header.jpg`)
}

export async function getPlayerCount({steamId}: { steamId: SupportedGame }) {
    "use server";

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
        [SF6]: 'out on the streets',
        [SFV]: 'on the streets of V',
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
        const mock = mockedGamesData[steamId as SupportedGame] as Game

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