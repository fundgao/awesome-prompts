import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Nav } from '@/components/home/Nav'
import { Hero } from '@/components/home/Hero'
import { Footer } from '@/components/home/Footer'
import { Link } from '@/i18n/navigation'
import { SECTION_IDS } from '@/data/matang'

type Props = { params: Promise<{ locale: string }> }

const SECTION_CARD_KEYS = [
  { id: SECTION_IDS[0], cardKey: 'card1' },
  { id: SECTION_IDS[1], cardKey: 'card2' },
  { id: SECTION_IDS[2], cardKey: 'card3' },
  { id: SECTION_IDS[3], cardKey: 'card4' },
] as const

const STATS = [
  { valueKey: 'stat1Value', labelKey: 'stat1Label' },
  { valueKey: 'stat2Value', labelKey: 'stat2Label' },
  { valueKey: 'stat3Value', labelKey: 'stat3Label' },
  { valueKey: 'stat4Value', labelKey: 'stat4Label' },
] as const

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />

        {/* Overview */}
        <section id="overview" className="site-container py-12 sm:py-16">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-white/5">
            <Image
              src="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1200&q=80"
              alt={t('imageAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>

          {/* Stats bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {STATS.map(({ valueKey, labelKey }) => (
              <div
                key={labelKey}
                className="matang-card flex flex-col items-center gap-1 px-4 py-5 text-center"
              >
                <span className="text-xl font-bold sm:text-2xl matang-gold-text">
                  {t(valueKey)}
                </span>
                <span className="text-xs text-white/60 sm:text-sm">
                  {t(labelKey)}
                </span>
              </div>
            ))}
          </div>

          {/* Text */}
          <div className="mt-8 space-y-5 text-white/90">
            <p className="text-lg leading-relaxed">{t('overview1')}</p>
            <p className="text-lg leading-relaxed">{t('overview2')}</p>
            <p className="text-lg leading-relaxed">{t('overview3')}</p>
          </div>

          {/* Photo grid */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5">
              <Image
                src="/mata-cba.webp"
                alt={t('imageAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5">
              <Image
                src="/mata-gaotie.webp"
                alt={t('imageAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5 col-span-2 sm:col-span-1">
              <Image
                src="https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=600&q=80"
                alt={t('imageAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          </div>
        </section>

        {/* Section cards */}
        <section className="site-container pb-16 sm:pb-20">
          <h2 className="matang-section-title mb-6 text-xl sm:text-2xl">
            {t('exploreTitle')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SECTION_CARD_KEYS.map(({ id, cardKey }) => (
              <Link
                key={id}
                href={`/${id}`}
                className="matang-card group flex flex-col gap-3 p-5 transition-colors hover:border-white/20"
              >
                <h3 className="font-semibold text-white group-hover:text-[var(--matang-gold)] transition-colors">
                  {t(`${cardKey}Title`)}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-white/60">
                  {t(`${cardKey}Desc`)}
                </p>
                <span className="text-xs text-[var(--matang-gold-muted)] group-hover:text-[var(--matang-gold)] transition-colors">
                  {t('readMore')}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
