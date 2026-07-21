import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  reveal?: boolean
}

export default function Section({ children, className = '', reveal = false }: SectionProps) {
  return (
    <section className={`section ${className}`.trim()}>
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
