import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from '../../components/common/Badge'

describe('Badge', () => {
  it('renders badge text', () => {
    render(<Badge>TEST</Badge>)
    expect(screen.getByText('TEST')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom-class">TEST</Badge>)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})

