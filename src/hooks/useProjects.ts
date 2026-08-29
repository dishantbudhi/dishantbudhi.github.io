import { contentPaths } from '../config/content'
import { useJsonData } from './useJsonData'
import type { ProjectFull } from '../types'

export function useProjects() {
  const { data, loading, error } = useJsonData<ProjectFull[]>(contentPaths.projects)
  return { projects: data ?? [], loading, error }
}

export function useProject(slug: string) {
  const { projects, loading, error } = useProjects()
  return {
    project: projects.find((project) => project.slug === slug) ?? null,
    loading,
    error,
  }
}
