import { type ReactNode, type SVGProps } from 'react'

function Base({ children, ...props }: { children: ReactNode } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  )
}

export const IconArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <Base {...props}><path d="M5 12h14M13 6l6 6-6 6" /></Base>
)

export const IconMail = (props: SVGProps<SVGSVGElement>) => (
  <Base {...props}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M4 6.5l8 6 8-6" /></Base>
)

export const IconUser = (props: SVGProps<SVGSVGElement>) => (
  <Base {...props}><circle cx="12" cy="8" r="3.4" /><path d="M5 20.5c1.3-4 4-5.8 7-5.8s5.7 1.8 7 5.8" /></Base>
)

export const IconPin = (props: SVGProps<SVGSVGElement>) => (
  <Base {...props}><path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.4" /></Base>
)

export const IconSpark = (props: SVGProps<SVGSVGElement>) => (
  <Base {...props}><path d="M12 3l2.2 5.6 6 .5-4.6 3.9 1.5 5.8L12 15.9l-5.1 2.9 1.5-5.8-4.6-3.9 6-.5L12 3z" /></Base>
)

export const IconInstagram = (props: SVGProps<SVGSVGElement>) => (
  <Base {...props}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></Base>
)

export const IconYoutube = (props: SVGProps<SVGSVGElement>) => (
  <Base {...props}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10.5 9.3v5.4l4.8-2.7-4.8-2.7z" fill="currentColor" stroke="none" /></Base>
)

export const IconTiktok = (props: SVGProps<SVGSVGElement>) => (
  <Base {...props}><path d="M13 3v11.2a3.1 3.1 0 1 1-2.6-3.06" /><path d="M13 3c.4 2.4 2.1 4.1 4.6 4.4" /></Base>
)

export const IconPlay = (props: SVGProps<SVGSVGElement>) => (
  <Base {...props}><path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" stroke="none" /></Base>
)

export const IconPause = (props: SVGProps<SVGSVGElement>) => (
  <Base {...props}><rect x="6.5" y="5.5" width="4" height="13" rx="1" fill="currentColor" stroke="none" /><rect x="13.5" y="5.5" width="4" height="13" rx="1" fill="currentColor" stroke="none" /></Base>
)
