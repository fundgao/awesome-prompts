import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'

export async function Hero() {
  const t = await getTranslations('hero')

  return (
    <section
      id="hero"
      className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 py-24 text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.82_0.15_85/0.08)_0%,transparent_50%)]" />
      <div className="relative z-10 max-w-3xl">
        <h1 className="matang-hero-title text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-white/80 sm:text-xl">{t('subtitle')}</p>
        <div className="mt-10">
          <Button
            asChild
            className="matang-btn-primary h-12 rounded-full px-8 text-base"
          >
            <a href="#overview" className="text-black hover:text-black!">
              {t('cta')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
