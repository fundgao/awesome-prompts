import Image from 'next/image'
import { Marquee } from '@/components/ui/marquee'

const YOUSHEN_IMAGES = Array.from(
  { length: 21 },
  (_, i) => `/游神/游神${i + 1}.webp`,
)

const row1 = YOUSHEN_IMAGES.slice(0, 11)
const row2 = YOUSHEN_IMAGES.slice(11)

function ImageCard({ src }: { src: string }) {
  return (
    <div className="group relative h-40 w-60 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:h-48 sm:w-72">
      <Image
        src={src}
        alt="游神"
        fill
        className="object-cover transition-transform duration-300"
        sizes="(max-width: 640px) 240px, 288px"
      />
    </div>
  )
}

export function YoushenMarquee() {
  return (
    <div className="relative w-full overflow-hidden">
      <Marquee pauseOnHover className="[--duration:65s] [--gap:1.75rem]">
        {row1.map((src) => (
          <ImageCard key={src} src={src} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        className="mt-3 [--duration:65s] [--gap:1.75rem]"
      >
        {row2.map((src) => (
          <ImageCard key={src} src={src} />
        ))}
      </Marquee>
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--matang-bg)] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--matang-bg)] to-transparent sm:w-24" />
    </div>
  )
}
