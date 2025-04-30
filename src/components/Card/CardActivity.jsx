import React from 'react'
import TeamAvatar from '../Project/TeamAvatar'
import { HiCloudDownload } from 'react-icons/hi'
import moment from 'moment'

export default function CardActivity({activity}) {
  const parseDate = (date) => {
    return moment(date).fromNow()
  }
  return (
    <div className='w-full py-4 px-4 bg-neutral-100 rounded-lg flex gap-4'>
            <div className='w-8 h-8 aspect-square'>
                {activity && activity.user &&  <TeamAvatar name={activity.user.name} useTooltip={false} />}

            </div>
            <div className='flex flex-col grow'>
                <div className='flex justify-between'>
                    {activity && activity.user && <h3 className='text-sm font-semibold'>{activity.user.name}</h3>}
                    {activity && <span className='text-xs text-neutral-400'>{parseDate(activity.createdAt)}</span>}
                </div>
                {activity && <p className='text-sm line-clamp-2'>{activity.message}</p>}

                {activity && activity.file && <div className='flex px-2 mt-2 bg-neutral-50 py-2 gap-4 items-center w-fit rounded-xl text-xs cursor-pointer'>
                    <span className='underline underline-offset-4 text-indigo-500'>{activity.file}</span>
                    <HiCloudDownload className='text-xl text-neutral-700' />
                </div>}
            </div>

    </div>
  )
}
