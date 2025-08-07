/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Download,
  Pause,
  Play,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from 'lucide-react'
import Image from 'next/image'

// Helper to decode HTML entities like &quot;
const decodeHTMLEntities = (text: string) => {
  const div = document.createElement('div')
  div.innerHTML = text
  return div.textContent || text
}

interface SongPlayerProps {
  song: Song
  onClose: () => void
}

const SongPlayer: React.FC<SongPlayerProps> = ({ song, onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  const audioUrl =
    song.downloadUrl.find((d) => d.quality === '320kbps')?.url ||
    song.downloadUrl[0]?.url
  const albumArt = song.image[song.image.length - 1]?.url || '/placeholder.png'

  const decodedTitle = decodeHTMLEntities(song.name)
  const decodedAlbum = decodeHTMLEntities(song.album.name)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => setProgress(audio.currentTime)
    const setMeta = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', setMeta)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', setMeta)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    isPlaying ? audio.pause() : audio.play()
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = value[0]
    setProgress(value[0])
  }

  const handleSpeedChange = (value: string) => {
    const newSpeed = parseFloat(value)
    setSpeed(newSpeed)
    if (audioRef.current) audioRef.current.playbackRate = newSpeed
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return
    const vol = value[0]
    audio.volume = vol
    setVolume(vol)
    setIsMuted(vol === 0)
  }

  const skipForward = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(audio.currentTime + 10, duration)
  }

  const skipBackward = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(audio.currentTime - 10, 0)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-2 sm:px-4">
      <div className="bg-background rounded-xl shadow-lg p-4 w-full max-w-screen-sm sm:max-w-2xl space-y-4 relative animate-fadeIn">
        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-white"
        >
          &times;
        </button> */}

        {/* Album + Title */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-accent shrink-0">
            <Image
              src={albumArt}
              alt={decodedTitle}
              fill
              sizes="(max-width: 768px) 100vw, 128px"
              className={`object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
            />
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-bold text-primary truncate max-w-full break-words">
              {decodedTitle}
            </h2>
            <p className="text-muted-foreground text-sm truncate max-w-full break-words">
              {decodedAlbum}
            </p>
          </div>

          <Button variant="secondary" asChild className="w-full sm:w-auto">
            <a
              href={audioUrl}
              download
              className="flex items-center justify-center w-full"
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </a>
          </Button>
        </div>

        {/* Progress Bar */}
        <Slider
          min={0}
          max={duration}
          value={[progress]}
          onValueChange={handleSeek}
          className="text-accent"
        />

        {/* Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Playback Controls */}
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Button size="icon" variant="ghost" onClick={skipBackward}>
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button onClick={togglePlay} variant="default" size="icon">
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>
            <Button size="icon" variant="ghost" onClick={skipForward}>
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 w-full sm:w-auto sm:min-w-[150px] justify-center sm:justify-end">
            <Button size="icon" variant="ghost" onClick={toggleMute}>
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={[volume]}
              onValueChange={handleVolumeChange}
              className="w-full max-w-[120px]"
            />
          </div>

          {/* Speed Select */}
          <Select onValueChange={handleSpeedChange} defaultValue="1">
            <SelectTrigger className="w-full sm:w-[120px] mx-auto sm:mx-0">
              <SelectValue placeholder="Speed" />
            </SelectTrigger>
            <SelectContent>
              {[0.5, 1, 1.5, 2].map((val) => (
                <SelectItem key={val} value={val.toString()}>
                  {val}x
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Audio Element */}
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
      </div>
    </div>
  )
}

export default SongPlayer
