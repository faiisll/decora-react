import React from 'react'
import TeamAvatar from '../Project/TeamAvatar'

export default function MiniProfile({user}) {
  return (
    user ? <div className='flex py-2 px-4 bg-base-200 rounded gap-2 items-center'>
        <div className='w-8 h-8'>
          <TeamAvatar  name={user.name} useTooltip={false} />
        </div>
        <div className='flex flex-col grow'>
            <span className='text-md max-w-fit overflow-ellipsis line-clamp-1'>{user.name}</span>
            <span className='text-gray-400 text-xs'>{user.roleTag ? user.roleTag : user.role }</span>
        </div>
        
    </div> : ""
  )
}
