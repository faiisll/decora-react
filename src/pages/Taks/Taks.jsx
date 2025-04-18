import React from 'react'
import TableTasks from '../../components/Table/TableTasks'

export default function Taks() {
  return (
    <div className='w-full flex flex-col h-full gap-2'>
      <div>
        <h1 className='font-medium text-lg'>Task</h1>
        <h2 className='text-sm text-gray-400'>Monitor project task</h2>
      </div>
      <TableTasks />
    </div>
  )
}
