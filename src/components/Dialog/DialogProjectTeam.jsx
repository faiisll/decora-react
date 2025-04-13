import React from 'react'
import DialogModal from './Dialog'
import CardMember from '../Card/CardMember'
import { TbTrashX, TbX } from "react-icons/tb";
import CardAddMember from '../Card/CardAddMember';

export default function DialogProjectTeam({open = false, onChange = () => {}, teams = [], projectId}) {
  return (
    <DialogModal open={open} onToggle={onChange} size='w-lg overflow-y-hidden'>
        <div className='w-full flex flex-col gap-4 overflow-y-auto max-h-full gap'>
            <div className='flex justify-between items-center'>
              <h4 className='font-semibold'>Project Teams</h4>
              <button className='btn btn-ghost btn-sm' onClick={() => {onChange(false)}}>
                <TbX className='text-lg'/>
              </button>
            </div>
            <div className='flex items-center gap-4 pl-2'>
              <select className='select'>
                <option value="" disabled>tess</option>
                <option value="f">Faisal</option>
              </select>
              <CardAddMember />
            </div>
            <div className='flex flex-col gap-2 max-h-72 overflow-auto'>
                {teams.map((member, index) => (
                    <CardMember key={index} member={member}>
                      <button className='btn btn-soft btn-error btn-circle'>
                        <TbTrashX className='text-xl' />
                      </button>
                    </CardMember>
                ))}
            </div>
        </div>
    </DialogModal>
  )
}
