import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Experience from '../../components/Experience'
import { experienceData } from '../../data/experienceData'

describe('Experience', () => {
  it('renders experience section', () => {
    render(<Experience />)
    expect(screen.getByText('WORK')).toBeInTheDocument()
  })

  it('renders all experiences from data', () => {
    render(<Experience />)
    experienceData.forEach(exp => {
      expect(screen.getByText(exp.company)).toBeInTheDocument()
      expect(screen.getByText(exp.role)).toBeInTheDocument()
    })
  })

  it('renders team when provided', () => {
    const expWithTeam = experienceData.find(exp => exp.team)
    if (expWithTeam) {
      render(<Experience />)
      expect(screen.getByText(expWithTeam.team)).toBeInTheDocument()
    }
  })

  it('accepts custom experiences prop', () => {
    const customExp = [
      {
        company: 'Test Company',
        role: 'Test Role',
        period: 'JAN 2025',
        description: 'Test description',
      },
    ]
    render(<Experience experiences={customExp} />)
    expect(screen.getByText('Test Company')).toBeInTheDocument()
  })
})

