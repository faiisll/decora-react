import React from 'react'
import TeamAvatar from '../Project/TeamAvatar'

export default function CardActivity({name = "Faisal", message = "Updating task design plan documnet, on project."}) {
  return (
    <div className='w-full py-4 px-4 bg-neutral-100 rounded-lg flex gap-4'>
            <div className='w-8 h-8 aspect-square'>
                <TeamAvatar name={name} useTooltip={false} />

            </div>
            <div className='flex flex-col grow'>
                <div className='flex justify-between'>
                    <h3 className='text-sm font-semibold'>{name}</h3>
                    <span className='text-xs text-neutral-400'>In 3 mins</span>
                </div>
                <p className='text-sm line-clamp-2'>{message}</p>
            </div>

    </div>
  )
}
