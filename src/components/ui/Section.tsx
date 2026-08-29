import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  reveal?: boolean
}

export default function Section({
  children,
  className = '',
  id,
  reveal = false,
}: SectionProps) {
  return (
    <section className={`section ${className}`.trim()}>
      <div id={id} className="container">
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
