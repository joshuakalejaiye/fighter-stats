import { prisma } from '@/server/db'
import Image from 'next/image'

export default async function Game({
  params,
}: {
  params: { steamId: string }
}) {
  const steamId = Number(params.steamId)

  const res = await prisma.games.findUnique({
    where: {
      steam_id: steamId,
    },
    select: {
      image_link: true,
    },
  })

  if (!res) throw new Error('Game not known')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white dark:bg-black">
      <Image src={res?.image_link ?? ''} alt="hi" width={300} height={300} />
    </main>
  )
}
