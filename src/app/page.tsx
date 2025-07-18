"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Grid,
  Typography,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Modal,
  CardMedia,
  Chip,
  Stack,
  IconButton,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import PokemonCard from "@/components/PokemonCard"
import SearchBar from "@/components/SearchBar"
import { getPokemons } from "@/poke/getPokemons"
import { getPokemonDetail } from "@/poke/getPokemonDetail"
import type { Pokemon, PokemonDetail } from "@/types/pokemon"

const allTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
]

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const data = await getPokemons()
      setPokemons(data)
      setFilteredPokemons(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const filtered = pokemons.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (typeFilter === "" || p.types.includes(typeFilter))
    )
    setFilteredPokemons(filtered)
  }, [search, typeFilter, pokemons])

  const handleOpenDetail = async (pokemon: Pokemon) => {
    if (!pokemon.id) {
      console.error("El Pokémon no tiene id:", pokemon)
      return
    }
    setSelectedPokemon(pokemon)
    setDetailLoading(true)
    try {
      const detail = await getPokemonDetail(pokemon.id)
      setPokemonDetail(detail)
    } catch {
      setPokemonDetail(null)
    } finally {
      setDetailLoading(false)
    }
  }

  const handleCloseDetail = () => {
    setSelectedPokemon(null)
    setPokemonDetail(null)
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

      <Box sx={{ mb: 2 }}>
        <SearchBar onSearch={setSearch} />
      </Box>

      <Box sx={{ mb: 4, maxWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="type-select-label">Filtrar por tipo</InputLabel>
          <Select
            labelId="type-select-label"
            value={typeFilter}
            label="Filtrar por tipo"
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            {allTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {filteredPokemons.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          No se encontraron pokémon que coincidan con tu búsqueda.
        </Typography>
      ) : (
        <Grid container spacing={3} component="div" columns={12}>
          {filteredPokemons.map((pokemon) => (
            <Grid
              key={pokemon.id}
              xs={{ span: 12 }}
              sm={{ span: 6 }}
              md={{ span: 4 }}
              lg={{ span: 3 }}
              component="div"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <div
                onClick={() => handleOpenDetail(pokemon)}
                style={{ cursor: "pointer" }}
              >
                <PokemonCard pokemon={pokemon} />
              </div>
            </Grid>
          ))}
        </Grid>
      )}

      <Modal
        open={selectedPokemon !== null}
        onClose={handleCloseDetail}
        aria-labelledby="pokemon-detail-title"
        aria-describedby="pokemon-detail-description"
      >
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
            width: "90%",
            borderRadius: 2,
            outline: "none",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleCloseDetail}>
              <CloseIcon />
            </IconButton>
          </Box>

          {detailLoading ? (
            <Typography>Cargando detalles...</Typography>
          ) : pokemonDetail ? (
            <>
              <CardMedia
                component="img"
                height="200"
                image={pokemonDetail.sprite}
                alt={pokemonDetail.name}
                sx={{ objectFit: "contain", mb: 2 }}
              />
              <Typography
                id="pokemon-detail-title"
                variant="h4"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                {pokemonDetail.name}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                sx={{ mb: 2 }}
              >
                {pokemonDetail.types.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    sx={{
                      textTransform: "capitalize",
                      bgcolor: getTypeColor(type),
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                ))}
              </Stack>

              <Typography variant="h6">Stats:</Typography>
              {pokemonDetail.stats.map((stat) => (
                <Typography key={stat.name} sx={{ textTransform: "capitalize" }}>
                  {stat.name.replace("-", " ")}: {stat.base_stat}
                </Typography>
              ))}

              <Typography variant="h6" sx={{ mt: 2 }}>
                Habilidades:
              </Typography>
              {pokemonDetail.abilities.map((ability) => (
                <Typography
                  key={ability}
                  sx={{ textTransform: "capitalize" }}
                >
                  {ability.replace("-", " ")}
                </Typography>
              ))}
            </>
          ) : (
            <Typography>Error al cargar detalles.</Typography>
          )}
        </Box>
      </Modal>
    </Container>
  )
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
