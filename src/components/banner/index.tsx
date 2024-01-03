"use client"

export default function Banner({ playerCount, playerCountTitle } : { playerCount: string | number, playerCountTitle: string }) {

  return (
        <div>
          <h1 className="text-[5.2rem] font-extrabold tracking-tight text-blue-300 md:text-[10rem]">
            {playerCount.toLocaleString(undefined)}
          </h1>
          <h2 className="pr-2 text-right text-xl font-bold -mt-6 md:-mt-12">{playerCountTitle}</h2>
        </div>
  )
}