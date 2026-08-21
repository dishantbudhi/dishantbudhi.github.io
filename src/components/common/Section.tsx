import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  reveal?: boolean
  variant?: 'default' | 'hero'
}

export default function Section({
  children,
  className = '',
  reveal = false,
  variant = 'default',
}: SectionProps) {
  return (
    <section className={`section section--${variant} ${className}`.trim()}>
      <div className="container">
        {reveal ? (
          <div className="reveal" data-reveal="">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  )
}
