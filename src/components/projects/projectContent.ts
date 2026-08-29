import type { ProjectFull, ProjectSection } from '../../types'

export function isProjectSection(section: ProjectSection, heading: string) {
  return section.content.match(/^##\s+(.+)$/m)?.[1].trim().toLowerCase() === heading.toLowerCase()
}

function getProjectSectionContent(project: ProjectFull, heading: string) {
  const section = project.sections.find((item) => isProjectSection(item, heading))
  return section?.content.replace(/^##\s+.+\n*/m, '').trim() ?? ''
}

export function getProjectOverview(project: ProjectFull) {
  return getProjectSectionContent(project, 'Overview')
}

export function getProjectStack(project: ProjectFull) {
  return getProjectSectionContent(project, 'Stack')
    .split(/\s*·\s*|\n+/)
    .map((item) => item.replace(/^[-*]\s+/, '').trim())
    .filter(Boolean)
}
