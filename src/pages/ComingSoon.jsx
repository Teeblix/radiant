import { useEffect } from 'react'

export default function ComingSoon({ title = 'Coming Soon' }) {
  useEffect(() => {
    document.title = `${title} — Radiant`
    return () => { document.title = 'Radiant — Fine Jewelry | Timeless Elegance, Curated for You' }
  }, [title])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-[var(--gutter)]">
      <a href="/" className="font-display text-[30px] leading-none text-ink">
        RADIANT
      </a>
      <div className="mt-[60px] flex flex-col items-center gap-[20px]">
        <h1 className="font-display text-[52px] leading-(--leading-display) text-ink md:text-[72px] xl:text-[90px]">
          {title.toUpperCase()}
        </h1>
        <p className="max-w-[460px] text-center text-[18px] leading-[28px] text-body/70">
          We're crafting something beautiful. This page will be ready soon.
        </p>
      </div>
      <a
        href="/"
        className="mt-[48px] inline-flex items-center justify-center bg-ink px-[40px] py-[18px] text-[16px] text-white transition-opacity duration-300 hover:opacity-80"
      >
        Back to Home
      </a>
    </div>
  )
}
