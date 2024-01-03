import { getTotalPlayerCount } from '@/server/steam-actions'

export default async function Banner() {
  const { totalPlayerCount } = await getTotalPlayerCount()

  return (
    <div>
      <h1 className="text-[5.2rem] font-extrabold tracking-tight text-lime-400 md:text-[10rem]">
        {totalPlayerCount?.toLocaleString(undefined)}
      </h1>
      <h2 className="-mt-6 pr-2 text-right text-xl font-bold md:-mt-12">
        {'neutral skippers'}
      </h2>
    </div>
  )
}
