import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import SearchBar from "../SearchBar"

describe("SearchBar", () => {
  it("renderiza el input de búsqueda", () => {
    const mockOnSearch = jest.fn()
    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText(/buscar pokémon/i)
    expect(input).toBeInTheDocument()
  })

  it("llama a onSearch cuando el texto cambia", () => {
    const mockOnSearch = jest.fn()
    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText(/buscar pokémon/i)

    fireEvent.change(input, { target: { value: "pika" } })

    expect(mockOnSearch).toHaveBeenCalledWith("pika")
    expect(mockOnSearch).toHaveBeenCalledTimes(1)
  })
})
