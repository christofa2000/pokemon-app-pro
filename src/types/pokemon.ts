export interface Pokemon {
  id: number
  name: string
  url: string
  types: string[]
}

export interface PokemonStat {
  name: string
  base_stat: number
}

export interface PokemonDetail {
  id: number
  name: string
  types: string[]
  stats: PokemonStat[]
  abilities: string[]
  sprite: string
}
