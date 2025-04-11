import clsx from 'clsx';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip'
import TeamAvatar from './TeamAvatar';

const teamMembers = [
  { name: "Alice Johnson", role: "Project Manager", status: "active" },
  { name: "David Lee", role: "Designer", status: "active" },
  { name: "Mia Chen", role: "Contractor", status: "active" },
  { name: "Dave", role: "Contractor", status: "active" },
];


export default function TeamSection() {


  return (
    <div className='w-full h-full max-h-64 rounded-3xl bg-gray-100 overflow-hidden px-6 py-5 flex flex-col'>
      <div className='flex w-full justify-between'>
        <div className='flex items-center'>
          <span className='font-semibold'>Members</span>
        </div>

        <button className='btn btn-neutral btn-sm'>Add</button>
      </div>

      <div className='w-full mt-2 overflow-y-auto grid grid-cols-6 sm:grid-cols-8 md:grid-cols-6 2xl:grid-cols-10 gap-2'>
        {teamMembers.map((team, index) => <div key={index} className='aspect-square w-full'>
          <TeamAvatar name={team.name} role={team.role} />
        </div>)}

      </div>
      
    </div>
  );
}
