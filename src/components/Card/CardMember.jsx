import React from 'react'
import TeamAvatar from '../Project/TeamAvatar'

export default function CardMember({member, ...props}) {
  return (
    <div className='flex justify-between items-center bg-gray-50 py-4 px-4 rounded-lg group/member transition-all hover:bg-gray-200'>
        <div className='flex gap-4'>
            <div className='aspect-square w-10 h-10'>
                <TeamAvatar rounded='rounded-md' textSize='text-sm' name={member.name} useTooltip={false} />

            </div>
            <div className='flex flex-col'>
                <h4>{member.name}</h4>
                {member.role && <span className='text-xs text-neutral-400'>{member.role}</span>}
            </div>
        </div>
        <div className='h-fit w-fit group-hover/member:visible invisible transition-all'>
            {props.children}
        </div>
    </div>
  )
}
