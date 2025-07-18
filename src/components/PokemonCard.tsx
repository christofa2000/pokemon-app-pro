"use client"

import React from "react"
import { Card, CardContent, CardMedia, Typography, Chip, Stack, Box } from "@mui/material"

interface PokemonCardProps {
  pokemon: {
    name: string
    url: string
    types: string[]
  }
  onClick?: () => void
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const id = pokemon.url.split("/").filter(Boolean).pop()

  return (
    <Card
      onClick={onClick}
      sx={{
        maxWidth: 345,
        width: "100%",
        boxShadow: 3,
        cursor: onClick ? "pointer" : "default",
        borderBottom: "4px solid transparent",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "visible",

        "&:hover": {
          boxShadow: 12,
          transform: "scale(1.05)",
          borderBottomColor: getTypeColor(pokemon.types[0]),
        },

        "&:focus-visible": {
          outline: `2px solid ${getTypeColor(pokemon.types[0])}`,
          outlineOffset: "2px",
        },

        // Línea animada debajo
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%) scaleX(0)",
          transformOrigin: "center",
          width: "80%",
          height: "4px",
          bgcolor: getTypeColor(pokemon.types[0]),
          borderRadius: 2,
          transition: "transform 0.3s ease",
          zIndex: 10,
        },

        "&:hover::after": {
          transform: "translateX(-50%) scaleX(1)",
        },
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={e => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={pokemon.name}
        sx={{ objectFit: "contain", bgcolor: "#f2f2f2", p: 2 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ textTransform: "capitalize", fontWeight: "bold", mb: 1 }}>
          {pokemon.name}
        </Typography>
        <Box>
          <Stack direction="row" spacing={1}>
            {pokemon.types.map(type => (
              <Chip
                key={type}
                label={type}
                size="small"
                sx={{
                  textTransform: "capitalize",
                  bgcolor: getTypeColor(type),
                  color: "white",
                  fontWeight: "bold",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    bgcolor: lightenColor(getTypeColor(type), 20),
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}

// Color helper para que los chips hagan lighten al hover
function lightenColor(color: string, percent: number) {
  const num = parseInt(color.replace("#", ""), 16)
  const r = Math.min(255, (num >> 16) + (255 * percent) / 100)
  const g = Math.min(255, ((num >> 8) & 0x00ff) + (255 * percent) / 100)
  const b = Math.min(255, (num & 0x0000ff) + (255 * percent) / 100)
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`
}

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
