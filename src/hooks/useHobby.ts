import { useFetch } from './useFetch'
import type { HobbyFull } from '../types'

export function useHobby(slug: string) {
  const { data, loading, error } = useFetch<HobbyFull>(
    `/data/hobbies/${slug}/data.json`
  )
  return { hobby: data, loading, error }
}
