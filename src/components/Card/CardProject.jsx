import React from 'react'

export default function CardProject({project}) {
  return (
    <div className='card card-md border border-gray-200 shadow-md'>
        <div className="card-body flex flex-col">
            <div className='flex justify-between items-center'>
                <div className="badge badge-sm badge-soft badge-warning">{project.status}</div>
                <span className='text-xs'>{project.endDate}</span>

            </div>

            <div className='flex flex-col cursor-pointer'>
                <h1 className='font-medium text-lg line-clamp-1 overflow-ellipsis'>{project.name}</h1>
                <small className='text-gray-500 line-clamp-1 overflow-ellipsis'>{project.description}</small>
            </div>

            <div className="flex items-center gap-3 mt-4">
                <div className="avatar">
                    <div className="mask mask-squircle h-8 w-8">
                        <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
                <div>
                <div className="text-xs opacity-50">Project Lead</div>
                <div className="font-bold text-xs">{project.lead}</div>
                </div>
            </div>

        </div>
    </div>
  )
}
