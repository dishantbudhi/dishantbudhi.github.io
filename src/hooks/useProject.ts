import { useFetch } from './useFetch'
import type { ProjectFull } from '../types'

export function useProject(slug: string) {
  const { data, loading, error } = useFetch<ProjectFull[]>('/data/projects/index.json')
  return {
    project: data?.find((project) => project.slug === slug) ?? null,
    loading,
    error,
  }
}
