import axios from "axios"

export interface PokemonDetail {
  name: string
  image: string
  types: string[]
  abilities: string[]
  stats: { name: string; base: number }[]
}

export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)  // <--- URL ABSOLUTA
    const data = res.data

    const pokemonDetail: PokemonDetail = {
      name: data.name,
      image: data.sprites.front_default,
      types: data.types.map((t: any) => t.type.name),
      abilities: data.abilities.map((a: any) => a.ability.name),
      stats: data.stats.map((s: any) => ({
        name: s.stat.name,
        base: s.base_stat,
      })),
    }

    return pokemonDetail
  } catch (error) {
    console.error("Error fetching pokemon detail:", error)
    throw new Error("Error al obtener detalle del Pokémon")
  }
}
