"use client"

import { useEffect, useRef, useState } from "react"
import { getPokemons } from "@/poke/getPokemons"
import { getPokemonDetail } from "@/poke/getPokemonDetail"
import { PokemonDetail } from "@/types/pokemon"
import PokemonCard from "@/components/PokemonCard"
import {
  Box,
  Grid,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Chip,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
} from "@mui/material"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([])
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonDetail[]>([])
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("")
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [audioPlaying, setAudioPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getPokemons()
        setPokemons(data)
        setFilteredPokemons(data)
      } catch (error) {
        console.error("Error al obtener los pokemons", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const filtered = pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterType === "" || pokemon.types.includes(filterType))
    )
    setFilteredPokemons(filtered)
  }, [search, filterType, pokemons])

  const handleOpenDetail = async (name: string) => {
    try {
      const detail = await getPokemonDetail(name)
      setSelectedPokemon(detail)
    } catch (error) {
      console.error("Error al obtener detalle", error)
    }
  }

  const handleCloseDetail = () => {
    setSelectedPokemon(null)
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (audioPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setAudioPlaying(!audioPlaying)
  }

  const allTypes = Array.from(new Set(pokemons.flatMap((p) => p.types)))

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
        mb={3}
      >
        <CatchingPokemonIcon color="primary" fontSize="large" />
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#3949ab",
          }}
        >
          Pokédex
        </Typography>
      </Box>

      <Box display="flex" gap={2} alignItems="center" mb={4} flexWrap="wrap">
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 220 }}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="filter-type-label">Filtrar por tipo</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            label="Filtrar por tipo"
          >
            <MenuItem value="">Todos</MenuItem>
            {allTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Tooltip title={audioPlaying ? "Pausar música" : "Reproducir música"}>
          <IconButton
            color={audioPlaying ? "secondary" : "primary"}
            onClick={toggleMusic}
            aria-label="Reproducir música de fondo"
          >
            <MusicNoteIcon />
          </IconButton>
        </Tooltip>

        <Typography
          variant="subtitle1"
          color={audioPlaying ? "secondary" : "textSecondary"}
          sx={{ userSelect: "none" }}
        >
          Intro Latina
        </Typography>

        <audio ref={audioRef} src="/bg-music.mp3" loop preload="auto" />
      </Box>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="40vh"
        >
          <CircularProgress />
        </Box>
      ) : filteredPokemons.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mt: 4 }}
        >
          No se encontraron pokémon que coincidan con tu búsqueda.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredPokemons.map((pokemon) => (
            <Grid item xs={12} sm={6} md={3} key={pokemon.name}>
              <PokemonCard
                pokemon={pokemon}
                onClick={() => handleOpenDetail(pokemon.name)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal detalle Pokémon */}
      <Dialog
        open={!!selectedPokemon}
        onClose={handleCloseDetail}
        maxWidth="sm"
        fullWidth
      >
        {selectedPokemon && (
          <>
            <DialogTitle
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                backgroundColor: "#3949ab",
                color: "#fff",
              }}
            >
              {selectedPokemon.name}
            </DialogTitle>
            <DialogContent dividers>
              <Box
                display="flex"
                justifyContent="center"
                mb={2}
                sx={{ userSelect: "none" }}
              >
                <img
                  src={selectedPokemon.image}
                  alt={selectedPokemon.name}
                  style={{ width: 180 }}
                />
              </Box>

              <Typography variant="h6" gutterBottom>
                Tipos:
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                {selectedPokemon.types.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    sx={{
                      textTransform: "capitalize",
                      bgcolor: getTypeColor(type),
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  />
                ))}
              </Box>

              <Typography variant="h6" gutterBottom>
                Habilidades:
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                {selectedPokemon.abilities.map((ab) => (
                  <Chip key={ab} label={ab} color="info" />
                ))}
              </Box>

              <Typography variant="h6" gutterBottom>
                Stats:
              </Typography>
              {selectedPokemon.stats.map((stat) => (
                <Box key={stat.name} mb={1}>
                  <Typography>
                    {stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}:{" "}
                    {stat.base}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(stat.base, 100)}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  )
}

// Función para colores según tipo Pokémon
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
