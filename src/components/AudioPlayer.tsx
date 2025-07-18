"use client"

import { useRef, useState } from "react"
import { IconButton } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }

    setPlaying(!playing)
  }

  return (
    <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 999 }}>
      <audio ref={audioRef} src="/bg-music.mp3" loop preload="auto" />
      <IconButton color="primary" onClick={toggleAudio}>
        {playing ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
    </div>
  )
}

export default AudioPlayer
