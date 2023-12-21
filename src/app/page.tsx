import { GameCard } from '@/components/game-card'
import Link from 'next/link'
import getGamesList from '../mocks/game-list.json'

export default function HomePage() {
  const { data } = getGamesList
  console.log(data)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white dark:bg-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight text-red-300 sm:text-[8rem]">
            28,378
          </h1>
          <h2 className="pr-2 text-right text-xl font-bold">Guilty Gears</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl p-4"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Heaven or Hell?</h3>
            <div className="text-lg">
              Are you ready? The battle with the opponent is about to start.
              However there is nothing to fear... Have hope. As long as you move
              accordingly without hesitation it will bring you a favorable
              result. Believe in victory.
            </div>
          </Link>
          <div className="pt-10">
            {data.map(({ steamId }) => (
              <div key={steamId}>
                <GameCard steamId={steamId} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
