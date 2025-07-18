import axios from "axios"
import type { Pokemon } from "@/types/pokemon"

export async function getPokemons(): Promise<Pokemon[]> {
  try {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
    const results = res.data.results as { name: string; url: string }[]

    const pokemonsWithTypes: Pokemon[] = await Promise.all(
      results.map(async (p) => {
        const detailRes = await axios.get(p.url)
        const types: string[] = detailRes.data.types.map((t: any) => t.type.name)
        const segments = p.url.split("/").filter(Boolean)
        const id = Number(segments[segments.length - 1])
        return {
          id,
          name: p.name,
          url: p.url,
          types,
        }
      })
    )

    return pokemonsWithTypes
  } catch (error) {
    console.error("Error fetching pokemons:", error)
    throw new Error("Error al obtener los pokemons")
  }
}
