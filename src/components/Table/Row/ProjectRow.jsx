import React from 'react'

export default function ProjectRow({no, name, descripription, status, lead, endDate, id}) {
  return (
    <tr>
        <th>
            {no && <span>{no}</span>}
        </th>
        <td>
            <div className='flex flex-col font-normal'>
                {name && <span className='text-lg font-medium line-clamp-1 overflow-ellipsis'>Redisgn cozzy appartmen</span>}
                {descripription && <span className='text-xs text-gray-500 line-clamp-1 overflow-ellipsis'>Requsted by client from Jakarta</span>}
            </div>
        </td>
        <td>
            {status && "Ongoing"}
        </td>
        
        <td>

            {lead && <div className="flex items-center gap-3">
                <div className="avatar">
                    {lead.avatar && <div className="mask mask-squircle h-12 w-12">
                        <img
                        src={lead.avatar}
                        alt="Project lead" />
                    </div>}
                </div>
                <div>
                    {lead.name && <div className="font-bold">Hart Hagerty</div>}
                    {lead.role && <div className="text-sm opacity-50">Designer</div>}
                </div>
            </div>}
        </td>
        <td>
            {endDate && <span>{endDate}</span>}
        </td>
        <th>
            <button className="btn btn-ghost btn-xs">details</button>
        </th>
    </tr>
  )
}
