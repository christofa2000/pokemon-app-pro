"use client"

import React from "react"
import { Card, CardContent, CardMedia, Typography, Chip, Stack, Box } from "@mui/material"

interface PokemonCardProps {
  pokemon: {
    id: number
    name: string
    url: string
    types: string[]
  }
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`

  return (
    <Card sx={{ maxWidth: 345, width: "100%", boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={pokemon.name}
        sx={{ objectFit: "contain", bgcolor: "#f2f2f2", p: 2 }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
          {pokemon.name}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Stack direction="row" spacing={1}>
            {pokemon.types.map((type) => (
              <Chip
                key={type}
                label={type}
                size="small"
                sx={{
                  textTransform: "capitalize",
                  bgcolor: getTypeColor(type),
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}

// Función para devolver colores según el tipo de Pokémon
function getTypeColor(type: string) {
  const colors: Record<string, string> = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  }
  return colors[type] || "#777"
}
