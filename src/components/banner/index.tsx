import { getBannerData } from '@/actions'

export default async function Banner() {
  const { totalPlayerCount, playerCountTitle: bannerPlayerCountTitle } = await getBannerData()

  return (
        <div>
          <h1 className="text-8xl font-extrabold tracking-tight text-red-300 md:text-[10rem]">
            {totalPlayerCount.toLocaleString(undefined)}
          </h1>
          <h2 className="pr-2 text-right text-xl font-bold">{bannerPlayerCountTitle}</h2>
        </div>
  )
}