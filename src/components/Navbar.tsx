import React from 'react'
import { Input } from './ui/input'
import { ModeToggle } from './ModeToggler'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { handleSearch } from '@/lib/actions'

const Navbar = () => {
  return (
    <div className='p-2 rounded-md gap-4 flex w-full items-center justify-between'>
         <h1 className='bg-gradient-to-r from-pink-400 from-10% to-90% to-primary bg-[length:300%_300%] bg-clip-text text-transparent font-dscript text-3xl font-black animate-gradient'>
           VibeSnehit
         </h1>
         <form action={handleSearch} className='w-full flex gap-2'>
         <Input name='search' type='text' placeholder='Enter by song or movie name' />
         <Button className='flex items-center justify-center' size={'icon'}><Search strokeWidth={2} /></Button>
         </form>
         <ModeToggle />
    </div>
  )
}

export default Navbar
