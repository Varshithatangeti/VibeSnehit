'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { fetchSongsByQuery } from '@/lib/actions'
import SongCard from './SongCard'

const DisplaySearchItems = () => {
  const searchParams = useSearchParams()
  const searchValue = searchParams.get('search')?.trim()
  const [songs, setSongs] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSongs = async () => {
      if (!searchValue) return setSongs([])
      setIsLoading(true)
      const results = await fetchSongsByQuery(searchValue)
      setSongs(results)
      setIsLoading(false)
    }

    fetchSongs()
  }, [searchValue])

  if (!searchValue) return null

  return (
    <div className='p-2 flex-1 flex gap-2 flex-wrap'>
      {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}
      {songs.length === 0 && !isLoading && (
        <p className="text-sm text-muted-foreground">No songs found for &apos;{searchValue}&apos;</p>
      )}
      {songs.map((song, idx) => (
        <SongCard key={idx} song={song} />
      ))}
    </div>
  )
}

export default DisplaySearchItems
