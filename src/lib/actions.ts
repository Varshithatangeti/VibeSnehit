'use server'

import { redirect } from "next/navigation"

export const handleSearch = async (formData : FormData) => {
    if (!formData){
        return
    }
    const searchValue = formData.get('search') as string
    redirect(`/?search=${encodeURIComponent(searchValue)}`)
}

export const fetchSongsByQuery = async (searchValue: string): Promise<Song[]> => {
  if (!searchValue?.trim()) return [];

  const endpoint = `https://saavn.dev/api/search/songs?query=${encodeURIComponent(searchValue)}`;

  try {
    const res = await fetch(endpoint);

    if (!res.ok) {
      console.error(`Failed to fetch songs: ${res.status} ${res.statusText}`);
      return [];
    }

    const { data } = await res.json();
    return data?.results ?? [];
  } catch (err) {
    console.error('Error fetching songs:', err);
    return [];
  }
};

