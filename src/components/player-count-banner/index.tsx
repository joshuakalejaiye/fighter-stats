import { getTotalPlayerCount } from '@/server/data/steam'

export default async function PlayerCountBanner() {
  const { totalPlayerCount } = await getTotalPlayerCount()

  return (
    <div>
      <h1 className="text-[7rem] md:text-[12rem] font-extrabold tracking-tight text-lime-400 ">
        {totalPlayerCount?.toLocaleString(undefined)}
      </h1>
      <h2 className="-mt-6 pr-2 text-right text-xl font-semibold md:-mt-12">
        {'fighting game players'}
      </h2>
    </div>
  )
}
