import React, { useEffect, useState } from 'react'
import TableProject from '../../components/Table/TableProject'
import { TbList, TbLayoutGrid, TbCategoryPlus } from "react-icons/tb";
import { HiMiniPlus } from "react-icons/hi2";
import ListCompactProjects from '../../components/List/ListCompactProjects';
import { useNavigate, useSearchParams } from 'react-router';
import { useGetProjectQuery } from '../../store/apis/projectApi';


export default function Project() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const [view, setView] = useState('table')
  const views = ['table', 'card']
  const {data, refetch} = useGetProjectQuery()

  const handleParams = () => {
    const viewParam = searchParams.get('view')

    if(!searchParams.has('view') || !views.includes(viewParam)){
      navigate('/project?view=table')
    }

    if(views.includes(viewParam)){
      setView(viewParam)
    }
    
  }

  const handleTab = (val = 'table') => {
    navigate('/project?view='+val, {replace: true})
    setView(val)

  }
  useEffect(() => {
    refetch()
    handleParams()
    
  }, [])

  return (
    <div className='w-full flex flex-col h-full gap-8'>
      <div className='flex justify-between'>
        <div>
          <h1 className='font-medium text-lg'>Project List</h1>
          <h2 className='text-sm text-gray-400'>Explore Our Interior Design Project Masterpieces</h2>

        </div>
        <div className='flex gap-2'>
          <div className="join">
            <button className={`btn join-item ${view === 'table' && 'btn-neutral'}` }onClick={() => {handleTab('table')}}>
              <TbList />
            </button>
            <button className={`btn join-item ${view === 'card' && 'btn-neutral'}`} onClick={() => {handleTab('card')}}>
              <TbLayoutGrid />
            </button>
          </div>

          <button className='btn btn-neutral' onClick={() => {navigate('/project/new')}}>
            <span>New</span>
            <HiMiniPlus />
          </button>

        </div>
      </div>
      {view === 'table' ? <TableProject data={data ? data.data : []} /> : <ListCompactProjects data={data ? data.data : []} />}
      <h1>Project</h1>
    </div>
  )
}
