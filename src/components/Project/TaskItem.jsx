import clsx from 'clsx';
import React from 'react';
import TeamAvatar from './TeamAvatar';
import ProjectStatus from '../Status/ProjectStatus';
import moment from 'moment';

const TaskItem = ({task, ...props}) => {
    const titleClass = "text-sm text-neutral-500"
    const parseDateJoin = (date) => {
        return moment(date).format("DD/MM/YYYY")
    }
    return (
        <div {...props} className='w-full cursor-pointer flex flex-col bg-gray-100 rounded-xl px-4 sm:px-8 py-6 gap-4 sm:flex-row sm:justify-between sm:items-center'>
            <div className='flex flex-col sm:grow sm:w-1/2'>
                <span className={clsx(titleClass)}>Title</span>
                <h4 className='line-clamp-1 overflow-ellipsis'>{task.name}</h4>
            </div>

            <div className='flex gap-4 sm:gap-0 text-center sm:text-left w-full sm:w-sm sm:max-w-sm justify-between bg-gray-50 p-4 rounded'>
                <div className='flex flex-col justify-center items-center'>
                    <span className={clsx(titleClass)}>Status</span>
                    <ProjectStatus status={task.status} />
                </div>
                <div className='flex flex-col'>
                    <span className={clsx(titleClass)}>Due Date</span>
                    <h4 className='text-xs md:text-md'>{parseDateJoin(task.dueDate)}</h4>
                </div>
                <div className='flex flex-col items-center sm:items-start'>
                    <span className={clsx(titleClass)}>Assignee</span>
                    <div className='w-6 h-6'>
                        <TeamAvatar name={task.assignee} rounded='rounded-md' textSize='text-sm' />
                    </div>
                </div>

            </div>
            
        </div>
    );
}

export default TaskItem;
