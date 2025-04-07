import React from 'react'

export default function MiniProfile() {
  return (
    <div className='flex py-2 px-4 bg-base-200 rounded gap-2 items-center'>
        <div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-8 h-8 rounded-full">
                <span className="text-xl">D</span>
            </div>
        </div>
        <div className='flex flex-col grow'>
            <span className='text-md max-w-fit overflow-ellipsis line-clamp-1'>Faisal Ayash</span>
            <span className='text-gray-400 text-xs'>Owner</span>
        </div>
        
    </div>
  )
}
