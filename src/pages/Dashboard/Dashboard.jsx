import React from 'react'
import AnimatePageFade from '../../components/Animate/AnimatePageFade'

export default function Dashboard() {
  return (
    <AnimatePageFade className='w-full flex flex-col h-full gap-2'>
      <div>
        <h1 className='font-medium text-lg'>Helo, Faisal Ayash</h1>
        <h2 className='text-sm text-gray-400'>Overview of all projects</h2>
      </div>
    </AnimatePageFade>
  )
}
