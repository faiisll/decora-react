import React from 'react'
import DashboardProjectStat from '../../components/Dashboard/DashboardProjectStat'
import CardProject from '../../components/Card/CardProject'
import { NavLink } from 'react-router'
import CardActivity from '../../components/Card/CardActivity'
import { useGetActivitiesQuery, useGetDashboardQuery, useGetProjectQuery } from '../../store/apis/projectApi'

export default function Dashboard() {
  const {data: summary, isLoading: loadingSum, refetch} = useGetDashboardQuery()
  const {data:projects, isLoading: loadingProject} = useGetProjectQuery({limit:3, page:1})
  const {data:activities, isLoading: loadingActivity} = useGetActivitiesQuery()
  return (
    <div className='w-full flex flex-col min-h-full gap-8 '>
      <div>
        <h1 className='font-medium text-lg'>Helo, Faisal Ayash</h1>
        <h2 className='text-sm text-gray-400'>Monitor your design project progress</h2>
      </div>

      <div className='w-full'>
        <DashboardProjectStat data={summary ? summary.data : null} loading={loadingSum} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
        <div className='col-span-1 md:col-span-3 gap-4 flex flex-col'>
          <div className='w-full flex justify-between item-center'>
            <h3 className='font-semibold'>Last Project</h3>
            <NavLink to={'/project'} className='text-sm text-blue-400'>More</NavLink>
          </div>

          <div className='flex flex-col gap-2'>
            {projects && !loadingProject &&  projects.data.map(project => (
              <CardProject project={project} key={project.id} />
            )) }
            
          </div>
        </div>
        <div className='col-span-1 md:col-span-2 flex flex-col gap-4'>
          <div className='w-full flex justify-between item-center'>
            <h3 className='font-semibold'>Activity</h3>
          </div>

          <div className='flex flex-col gap-2'>
            {!loadingActivity && activities && activities.data.map(act => ( <CardActivity key={act.id} activity={act} />))}
            
          </div>
        </div>
      </div>
    </div>
  )
}
