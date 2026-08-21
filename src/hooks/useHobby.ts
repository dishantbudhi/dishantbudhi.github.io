import { useFetch } from './useFetch'
import type { HobbyFull } from '../types'

export function useHobby(slug: string) {
  const { data, loading, error } = useFetch<HobbyFull[]>('/data/hobbies/index.json')
  return {
    hobby: data?.find((hobby) => hobby.slug === slug) ?? null,
    loading,
    error,
  }
}
