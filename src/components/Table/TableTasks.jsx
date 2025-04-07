import React from 'react'

export default function TableTasks() {
  return (
    <div className="overflow-x-auto grow max-h-[80vh]">
        <table className="table table-zebra table-pin-rows">
            {/* head */}
            <thead className='w-full'>
            <tr>
                <th>No</th>
                <th className='min-w-[240px]'>Name</th>
                <th>Status</th>
                <th className='min-w-[200px]'>Assignee</th>
                <th className='min-w-[140px]'>Date</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            
            </tbody>
        </table>
    </div>
  )
}
