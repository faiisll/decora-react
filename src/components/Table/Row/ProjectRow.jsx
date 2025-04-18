import React from 'react'
import ProjectStatus from '../../Status/ProjectStatus'
import TeamAvatar from '../../Project/TeamAvatar'
import clsx from 'clsx'
import Cell from '../Cell/Cell'
import moment from 'moment'
import { TbEye, TbTrashX } from "react-icons/tb";
import { useNavigate } from 'react-router'

export default function ProjectRow({project, index = 0}) {
    const parseDateJoin = (date) => {
        return moment(date).format("Do MMM, YYYY")
    }

    const navigate = useNavigate()

    const toProject = (id) => {
        navigate("/project/"+id)
    }
    
    return (
        project ? (
            <tr className={clsx((index+2)%2 === 0 ? 'bg-gray-100' : 'bg-gray-50')}>
                <Cell className="text-gray-900 font-medium">
                    {index+1}
                </Cell>
                <Cell>
                    {project.name}
                </Cell>
                <Cell>
                    <ProjectStatus status={project.status}/>
                </Cell>
                <Cell>
                    {project.lead ? (<div className='w-8 h-8 aspect-square'> <TeamAvatar name={project.lead} /></div>) : <ProjectStatus status="Unassigned"/>}
                </Cell>
                <Cell>
                    {parseDateJoin(project.endDate)}
                </Cell>
                <Cell className="font-medium">
                    <div className='flex gap-4'>
                        <button className="btn btn-soft btn-success btn-circle" onClick={() => {toProject(project.id)}}><TbEye className='text-lg' /></button>
                        <button className="btn btn-soft btn-error btn-circle"><TbTrashX className='text-lg' /></button>

                    </div>
                </Cell>
            </tr>) : ""
  )
}
