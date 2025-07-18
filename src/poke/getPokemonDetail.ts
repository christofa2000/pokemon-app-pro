import axios from "axios"
import type { PokemonDetail } from "@/types/pokemon"

export async function getPokemonDetail(idOrUrl: number | string): Promise<PokemonDetail> {
  try {
    const url =
      typeof idOrUrl === "number"
        ? `https://pokeapi.co/api/v2/pokemon/${idOrUrl}`
        : idOrUrl
    const res = await axios.get(url)
    const data = res.data

    return {
      id: data.id,
      name: data.name,
      types: data.types.map((t: any) => t.type.name),
      stats: data.stats.map((s: any) => ({
        name: s.stat.name,
        base_stat: s.base_stat,
      })),
      abilities: data.abilities.map((a: any) => a.ability.name),
      sprite: data.sprites.front_default,
    }
  } catch (error) {
    console.error("Error fetching pokemon detail:", error)
    throw new Error("Error al obtener detalle del Pokémon")
  }
}
