import React from 'react'
import TeamAvatar from '../Project/TeamAvatar'
import ProjectStatus from '../Status/ProjectStatus'
import moment from 'moment'
import { useNavigate } from 'react-router'


export default function CardProject({project}) {
    const parseDateJoin = (date) => {
        return moment(date).format("Do MMM, YYYY")
    }

    

    const navigate = useNavigate()
    const toProject = (id) => {
        navigate("/project/"+id)
    }
  return (
    project ? <div className='card card-md bg-neutral-50'>
        <div className="card-body flex flex-col">
            <div className='flex justify-between items-center'>
                <ProjectStatus status={project.status} />
                <span className='text-xs'>{parseDateJoin(project.endDate)}</span>
            </div>

            <div className='flex flex-col cursor-pointer' onClick={() => {toProject(project.id)}}>
                <h1 className='font-medium text-lg line-clamp-1 overflow-ellipsis'>{project.name}</h1>
                <small className='text-gray-500 line-clamp-1 overflow-ellipsis'>{project.description}</small>
            </div>

            <div className="flex items-center gap-3 mt-4">
                {project.lead && <div className="w-8 h-8 aspect-square">
                    <TeamAvatar name={project.lead} />
                </div>}
                <div>
                    <div className="text-xs opacity-50">Project Lead</div>
                    <div className="font-bold text-xs">{project.lead ? project.lead : "Unassigned"}</div>
                </div>
            </div>

        </div>
    </div> : ""
  )
}
