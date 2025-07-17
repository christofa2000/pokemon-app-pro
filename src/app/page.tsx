"use client"

import React, { useState, useEffect } from "react"
import { Box, Grid, Typography, Container } from "@mui/material"
import PokemonCard from "@/components/PokemonCard"
import SearchBar from "@/components/SearchBar"
import { getPokemons, Pokemon } from '@/poke/getPokemons'

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const data = await getPokemons()
      setPokemons(data)
      setFilteredPokemons(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleSearch = (query: string) => {
    const filtered = pokemons.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredPokemons(filtered)
  }

  if (loading) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5">Cargando pokémon...</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", textTransform: "uppercase", mb: 3 }}
      >
        Pokédex
      </Typography>

      <Box sx={{ mb: 4 }}>
        <SearchBar onSearch={handleSearch} />
      </Box>

      {filteredPokemons.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          No se encontraron pokémon que coincidan con tu búsqueda.
        </Typography>
      ) : (
        <Grid container spacing={3} component="div" columns={12}>
          {filteredPokemons.map((pokemon) => (
            <Grid
              key={pokemon.name}
              xs={{ span: 12 }}
              sm={{ span: 6 }}
              md={{ span: 4 }}
              lg={{ span: 3 }}
              component="div"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <PokemonCard pokemon={pokemon} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
