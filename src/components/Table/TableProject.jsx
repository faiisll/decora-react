import React from 'react'
import ProjectRow from './Row/ProjectRow'

export default function TableProject() {
  return (
    <div className="overflow-x-auto grow max-h-[80vh]">
        <table className="table table-zebra table-pin-rows">
            {/* head */}
            <thead className='w-full'>
            <tr>
                <th>No</th>
                <th className='min-w-[240px]'>Name</th>
                <th>Status</th>
                <th className='min-w-[200px]'>Leader</th>
                <th className='min-w-[140px]'>Due Date</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {/* <ProjectRow /> */}
            
            </tbody>
        </table>
    </div>
  )
}
