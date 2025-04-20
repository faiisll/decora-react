import React, { useEffect, useState } from 'react'
import TableProject from '../../components/Table/TableProject'
import { TbList, TbLayoutGrid, TbCategoryPlus } from "react-icons/tb";
import { HiMiniPlus } from "react-icons/hi2";
import ListCompactProjects from '../../components/List/ListCompactProjects';
import { useNavigate, useSearchParams } from 'react-router';
import { useDeleteProjectMutation, useGetProjectQuery } from '../../store/apis/projectApi';
import DialogConfirm from '../../components/Dialog/DialogConfirm';
import createToast from '../../components/toast/Toast';


export default function Project() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const [view, setView] = useState('table')
  const views = ['table', 'card']
  const {data, refetch} = useGetProjectQuery()
  const [deleteProject, {}] = useDeleteProjectMutation()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [dataDelete, setDataDelete] = useState(null)

  const handleParams = () => {
    const viewParam = searchParams.get('view')

    if(!searchParams.has('view') || !views.includes(viewParam)){
      navigate('/project?view=table')
    }

    if(views.includes(viewParam)){
      setView(viewParam)
    }
    
  }

  const handleConfirm = (project) => {
    
    setConfirmOpen(true)
    setDataDelete(project)

  }

  const handleDelete = () => {
    deleteProject(dataDelete.id).unwrap().then(() => {
      createToast({
        message: "Project has been deleted",
        type: "success"
        
      })

      setConfirmOpen(false)
    }).catch(err => {
      createToast({
        message: err.data.message,
        type: "error"
      })
      
    })

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
      <DialogConfirm
      open={confirmOpen}
      onChange={setConfirmOpen}
      onConfirm={handleDelete}
      confirmClass='btn-soft btn-error'
      confirmText='Yes, delete'
      description='Once it’s gone, it’s gone for good. Are you sure you want to say goodbye to this project?'
      title='Oops, You’re About to Delete This Project!' />
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
      {view === 'table' ? <TableProject data={data ? data.data : []} onDelete={handleConfirm} /> : <ListCompactProjects data={data ? data.data : []} />}
      <h1>Project</h1>
    </div>
  )
}
