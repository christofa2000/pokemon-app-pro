import axios from "axios"

export interface Pokemon {
  name: string
  url: string
  types: string[]  // agregamos types como array de strings
}

export async function getPokemons(): Promise<Pokemon[]> {
  try {
    // 1. Traemos lista básica de pokemons
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
    const results = res.data.results as { name: string; url: string }[]

    // 2. Para cada pokemon, hacemos petición para obtener detalles (incluyendo tipos)
    const pokemonsWithTypes = await Promise.all(
      results.map(async (p) => {
        const detailRes = await axios.get(p.url)
        const types: string[] = detailRes.data.types.map((t: any) => t.type.name)
        return {
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
