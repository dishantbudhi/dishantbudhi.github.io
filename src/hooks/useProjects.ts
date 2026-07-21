import { useFetch } from './useFetch'
import type { ProjectMeta } from '../types'

export function useProjects() {
  const { data, loading, error } = useFetch<ProjectMeta[]>('/data/projects/index.json')
  return { projects: data ?? [], loading, error }
}
