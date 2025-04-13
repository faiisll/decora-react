import React from 'react'
import DialogModal from './Dialog'
import TaskItem from '../Project/TaskItem'
import { HiCloudDownload } from "react-icons/hi";

export default function DialogDetailTask({open = false, onChange= (e) => {}, task=null}) {
  return (
    <DialogModal open={open} onToggle={onChange} size='md:w-2xl w-full'>
        <div className='w-full flex flex-col gap-4'>
            <h3>Task Detail</h3>
            {task && <TaskItem task={task} />}

            <div className='flex flex-col'>
                <span className='text-sm text-neutral-400'>Notes</span>
                <p>Some changes need to be check bos!</p>
            </div>
            <div className='flex flex-col'>
                <span className='text-sm text-neutral-400'>Document</span>
                <div className='flex px-4 bg-neutral-50 py-4 gap-4 items-center w-fit rounded-xl cursor-pointer'>
                    <span className='underline underline-offset-4 text-indigo-500'>Design revision.pdf</span>
                    <HiCloudDownload className='text-xl text-neutral-700' />
                </div>
            </div>

            <div className='flex justify-end gap-2'>
                <button className='btn btn-ghost' onClick={() => {onChange(false)}}>Close</button>
                <button className='btn btn-neutral'>Update</button>
            </div>
        </div>

    </DialogModal>
  )
}
