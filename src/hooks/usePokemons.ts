"use client"

import { useState, useEffect } from "react"

export interface Pokemon {
  name: string
  url: string
}

export function usePokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setIsLoading(true)
        setError(null)

        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        if (!res.ok) throw new Error("Error al obtener los pokémon")

        const data = await res.json()
        setPokemons(data.results)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchPokemons()
  }, [])

  return { pokemons, isLoading, error }
}
