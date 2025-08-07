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
  const albumArt =
    song.image[song.image.length - 1]?.url || '/placeholder.png'

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

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-background rounded-xl shadow-lg p-4 w-full max-w-2xl space-y-4 relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-white"
        >
          &times;
        </button>

        {/* Album, title, download */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border border-accent">
            <Image
              src={albumArt}
              alt={song.name}
              fill
              sizes="(max-width: 768px) 100vw, 128px"
              className={`object-cover ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            />
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h2 className="text-xl font-bold text-primary truncate">
              {song.name.replace(/&quot;/g, '"')}
            </h2>
            <p className="text-muted-foreground text-sm">
              {song.album.name.replace(/&quot;/g, '"')}
            </p>
          </div>

          <Button variant="secondary" asChild>
            <a href={audioUrl} download>
              <Download className="w-4 h-4 mr-2" /> Download
            </a>
          </Button>
        </div>

        {/* Slider */}
        <Slider
          min={0}
          max={duration}
          value={[progress]}
          onValueChange={handleSeek}
          className="text-accent"
        />

        {/* Controls */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
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

          <div className="flex items-center gap-2 w-[150px]">
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
            />
          </div>

          <Select onValueChange={handleSpeedChange} defaultValue="1">
            <SelectTrigger className="w-[120px]">
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

        {/* Audio element */}
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
      </div>
    </div>
  )
}

export default SongPlayer
  