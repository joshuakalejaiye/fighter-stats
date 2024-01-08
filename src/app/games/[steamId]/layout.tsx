import { prisma } from '@/server/db'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { steamId: string }
}): Promise<Metadata> {
  const res = await prisma.games.findUnique({
    where: {
      steam_id: Number(params.steamId),
    },
    select: {
      name: true,
    },
  })

  return {
    title: res?.name + ' | Fighter Stats',
    description: 'Stats page for' + res?.name,
  }
}

export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="dark">{children}</main>
}
