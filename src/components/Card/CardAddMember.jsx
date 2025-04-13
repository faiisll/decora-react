import React from 'react'

import { TbUsersPlus } from "react-icons/tb";

export default function CardAddMember({...props}) {
  return (
    <div className='flex cursor-pointer justify-between items-center bg-gray-50 py-4 px-4 rounded-lg group/member transition-all hover:bg-gray-200'>
        <div className='flex gap-4 items-center'>
            <div className='aspect-square w-10 h-10 border border-gray-800 border-dashed flex justify-center items-center rounded-lg'>
                <TbUsersPlus />
            </div>
            <h4 className='text-sm'>Add member</h4>
        </div>
    </div>
  )
}
