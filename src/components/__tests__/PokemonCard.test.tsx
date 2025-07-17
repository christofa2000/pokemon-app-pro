import React from "react"
import { render, screen } from "@testing-library/react"
import PokemonCard from "../PokemonCard"
import "@testing-library/jest-dom"

const mockPokemon = {
  id: 25,
  name: "pikachu",
  url: "",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
}

describe("PokemonCard", () => {
  test("muestra nombre e imagen correctamente", () => {
    render(<PokemonCard pokemon={mockPokemon} />)

    const name = screen.getByText(/pikachu/i)
    expect(name).toBeInTheDocument()

    const image = screen.getByAltText(/pikachu/i) as HTMLImageElement
    expect(image.src).toBe(mockPokemon.image)
  })
})
