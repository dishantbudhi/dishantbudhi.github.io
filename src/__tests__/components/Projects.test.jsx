import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Projects from '../../components/Projects'
import { projectData } from '../../data/projectData'

describe('Projects', () => {
  it('renders projects section', () => {
    render(<Projects />)
    expect(screen.getByText('PROJECTS')).toBeInTheDocument()
  })

  it('renders all projects from data', () => {
    render(<Projects />)
    projectData.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    })
  })

  it('accepts custom projects prop', () => {
    const customProjects = [
      {
        title: 'TEST PROJECT',
        icon: '🚀',
        tag: 'Test Tag',
        href: 'https://test.com',
        description: 'Test description',
        skills: 'Test • Skills',
        period: 'Test 2025',
      },
    ]
    render(<Projects projects={customProjects} />)
    expect(screen.getByText('TEST PROJECT')).toBeInTheDocument()
  })
})

