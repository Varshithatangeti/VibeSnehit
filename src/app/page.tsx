import DisplaySearchItems from '@/components/DisplaySearchItems'
import Navbar from '@/components/Navbar'
import React, {Suspense} from 'react'

const HomePage = () => {
  return (
    <div className='w-dvw @container h-dvh flex items-center bg-background justify-center'>
      <div className='sm:w-4xl overflow-auto h-11/12 max-sm:w-full max-sm:h-full border shadow-2xl dark:bg-foreground/5 rounded-md'>
      <Navbar />
      <Suspense fallback = {<div>Loading...</div>}>
      <DisplaySearchItems />
      </Suspense>
      </div>
    </div>
  )
}

export default HomePage