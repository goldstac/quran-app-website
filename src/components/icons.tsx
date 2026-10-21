import type { ReactNode } from 'react'

interface IconProps {
  className?: string
}

const svgBase = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

function icon(children: ReactNode, className = 'h-5 w-5') {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      {children}
    </svg>
  )
}

export function ArrowIcon({ className = 'h-4 w-4' }: IconProps) {
  return icon(
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>,
    className,
  )
}

export function BookIcon({ className }: IconProps) {
  return icon(
    <>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </>,
    className,
  )
}

export function LanguagesIcon({ className }: IconProps) {
  return icon(
    <>
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </>,
    className,
  )
}

export function HeadphonesIcon({ className }: IconProps) {
  return icon(
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />,
    className,
  )
}

export function LibraryIcon({ className }: IconProps) {
  return icon(
    <>
      <path d="M21 15V6" />
      <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M12 12H3" />
      <path d="M16 6H3" />
      <path d="M12 18H3" />
    </>,
    className,
  )
}

export function DownloadIcon({ className }: IconProps) {
  return icon(
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </>,
    className,
  )
}

export function KeyboardIcon({ className }: IconProps) {
  return icon(
    <>
      <rect width="20" height="16" x="2" y="4" rx="2.5" />
      <path d="M6 8h.01" />
      <path d="M10 8h.01" />
      <path d="M14 8h.01" />
      <path d="M18 8h.01" />
      <path d="M8 12h.01" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
      <path d="M7 16h10" />
    </>,
    className,
  )
}

export function PlayIcon({ className = 'h-4 w-4' }: IconProps) {
  return icon(
    <path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none" />,
    className,
  )
}
