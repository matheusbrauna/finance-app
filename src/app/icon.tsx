import { Icons } from '@/components/icons'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div tw="flex h-full w-full items-center justify-center text-white">
        <Icons.logo />
      </div>
    ),
    {
      ...size,
    },
  )
}
