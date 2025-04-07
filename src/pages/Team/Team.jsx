import React from 'react'
import AnimatePageFade from '../../components/Animate/AnimatePageFade'
import TableTeams from '../../components/Table/TableTeams'

export default function Team() {
  return (
    <AnimatePageFade className='w-full flex flex-col h-full gap-2'>
      <div>
        <h1 className='font-medium text-lg'>Teams</h1>
        <h2 className='text-sm text-gray-400'>Manage your teams</h2>
      </div>
      <TableTeams />
    </AnimatePageFade>
  )
}
