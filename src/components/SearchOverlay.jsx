import { useEffect, useRef } from 'react'
import searchIcon from '../assets/icons/search.svg'

export default function SearchOverlay({ open, onClose }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div
      className={[
        'fixed inset-x-0 top-0 z-[120] bg-cream',
        'transition-[opacity,transform,visibility] duration-500 ease-out',
        open
          ? 'visible translate-y-0 opacity-100'
          : 'invisible -translate-y-full opacity-0',
      ].join(' ')}
    >
      <div className="shell py-[28px] md:py-[40px] xl:py-[48px]">
        <div className="flex items-center gap-[14px]">
          <img src={searchIcon} width="18" height="18" alt="" className="shrink-0 opacity-50" />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search collections, pieces, materials…"
            className="min-w-0 flex-1 bg-transparent font-sans text-[18px] leading-[26px] text-body outline-none placeholder:text-body/40 md:text-[22px] md:leading-[30px]"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 cursor-pointer text-[16px] text-body/60 transition-colors duration-300 hover:text-body"
          >
            Cancel
          </button>
        </div>
        <span aria-hidden className="mt-[14px] block h-px w-full bg-body/20" />
      </div>
    </div>
  )
}
