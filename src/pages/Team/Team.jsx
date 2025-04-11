import React from 'react'
import AnimatePageFade from '../../components/Animate/AnimatePageFade'
import TableTeams from '../../components/Table/TableTeams'
import { TbUserPlus } from "react-icons/tb";
import DialogInviteUser from '../../components/Dialog/DialogInviteUser';

export default function Team() {
  return (
    <AnimatePageFade className='w-full flex flex-col h-full gap-2'>
      <DialogInviteUser id='invite-user' />
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='font-medium text-lg'>Adjust Team Member</h1>
          <h2 className='text-sm text-gray-400'>Quickly manage people and roles to keep your team details accurate and relevant.</h2>
        </div>
        <button className='btn btn-neutral' onClick={()=>document.getElementById('invite-user').showModal()}>
          Invite
          <TbUserPlus />
        </button>
      </div>

      <div className="tabs tabs-border">
        <input type="radio" name="my_tabs_2" className="tab" aria-label="Active" defaultChecked />
        <div className="tab-content">
          <TableTeams />
        </div>

        <input type="radio" name="my_tabs_2" className="tab" aria-label="Pending"  />
        <div className="tab-content">
          <TableTeams />
        </div>
      </div>
    </AnimatePageFade>
  )
}
