"use client"

import React, { useState, useEffect } from "react"
import { TextField, InputAdornment } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

type Props = {
  onSearch: (query: string) => void
  delay?: number // tiempo de debounce en ms
  placeholder?: string
}

const SearchBar: React.FC<Props> = ({ onSearch, delay = 400, placeholder = "Buscar Pokémon..." }) => {
  const [value, setValue] = useState("")
  const [debouncedValue, setDebouncedValue] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  useEffect(() => {
    onSearch(debouncedValue.trim().toLowerCase())
  }, [debouncedValue, onSearch])

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchBar
