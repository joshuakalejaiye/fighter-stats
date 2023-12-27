import { getBannerData } from '@/actions'

export default async function Banner() {
  const { totalPlayerCount, playerCountTitle: bannerPlayerCountTitle } = await getBannerData()

  return (
        <div>
          <h1 className="text-[5.2rem] font-extrabold tracking-tight text-blue-300 md:text-[10rem]">
            {totalPlayerCount.toLocaleString(undefined)}
          </h1>
          <h2 className="pr-2 text-right text-xl font-bold -mt-6 md:-mt-12">{bannerPlayerCountTitle}</h2>
        </div>
  )
}