import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return <span className={`badge ${className}`.trim()}>{children}</span>
}
