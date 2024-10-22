'use client'
import { Timeline } from 'react-twitter-widgets'

export const TwitterEmbed = () => {
  return (
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: 'TEKKEN',
      }}
      options={{
        height: '400',
      }}
    />
  )
}
