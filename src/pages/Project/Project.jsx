import React, { useState } from 'react'
import TableProject from '../../components/Table/TableProject'
import { TbList, TbLayoutGrid, TbCategoryPlus } from "react-icons/tb";
import { HiMiniPlus } from "react-icons/hi2";
import ListCompactProjects from '../../components/List/ListCompactProjects';
import AnimatePageFade from '../../components/Animate/AnimatePageFade';
import { useNavigate } from 'react-router';


export default function Project() {
  const [view, setView] = useState('table')
  const navigate = useNavigate()
  return (
    <AnimatePageFade className='w-full flex flex-col h-full gap-2'>
      <div className='flex justify-between'>
        <div>
          <h1 className='font-medium text-lg'>Project List</h1>
          <h2 className='text-sm text-gray-400'>Explore Our Interior Design Project Masterpieces</h2>

        </div>
        <div className='flex gap-2'>
          <div className="join">
            <button className={`btn join-item ${view === 'table' && 'btn-neutral'}` }onClick={() => {setView('table')}}>
              <TbList />
            </button>
            <button className={`btn join-item ${view === 'card' && 'btn-neutral'}`} onClick={() => {setView('card')}}>
              <TbLayoutGrid />
            </button>
          </div>

          <button className='btn btn-neutral' onClick={() => {navigate('/project/new')}}>
            <span>New</span>
            <HiMiniPlus />
          </button>

        </div>
      </div>
      {view === 'table' ? <TableProject /> : <ListCompactProjects />}
      <h1>Project</h1>
    </AnimatePageFade>
  )
}
