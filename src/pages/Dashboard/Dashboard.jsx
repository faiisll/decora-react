import React from 'react'
import DashboardProjectStat from '../../components/Dashboard/DashboardProjectStat'
import CardProject from '../../components/Card/CardProject'
import { NavLink } from 'react-router'
import CardActivity from '../../components/Card/CardActivity'

export default function Dashboard() {
  return (
    <div className='w-full flex flex-col min-h-full overflow-y-auto gap-8 '>
      <div>
        <h1 className='font-medium text-lg'>Helo, Faisal Ayash</h1>
        <h2 className='text-sm text-gray-400'>Monitor your interior design project progress</h2>
      </div>

      <div className='w-full'>
        <DashboardProjectStat />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
        <div className='col-span-1 md:col-span-3 gap-4 flex flex-col'>
          <div className='w-full flex justify-between item-center'>
            <h3 className='font-semibold'>Last Project</h3>
            <NavLink to={'/project'} className='text-sm text-blue-400'>More</NavLink>
          </div>

          <div className='flex flex-col gap-2'>
            <CardProject />
            <CardProject />
            <CardProject />
            
          </div>
        </div>
        <div className='col-span-1 md:col-span-2 flex flex-col gap-4'>
          <div className='w-full flex justify-between item-center'>
            <h3 className='font-semibold'>Activity</h3>
          </div>

          <div className='flex flex-col gap-2'>
            <CardActivity />
            <CardActivity />
            <CardActivity />
            <CardActivity />
            <CardActivity />
            <CardActivity />
            
          </div>
        </div>
      </div>
    </div>
  )
}
