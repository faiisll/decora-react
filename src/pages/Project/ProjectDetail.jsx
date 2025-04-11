import { useState } from 'react';
import clsx from 'clsx';
import PhasesSection from '../../components/Project/PhasesSection';
import TeamSection from '../../components/Project/TeamSection';
import ChatSection from '../../components/Project/ChatSection';
import ProjectDetailInfo from '../../components/Project/ProjectDetailInfo';

export default function ProjectDetail() {

  return (
    <div className="pt-8 space-y-8 w-full pb-10">
      <div className="grid md:grid-cols-5 md:grid-rows-1 grid-rows-1 gap-4 grid-cols-1">
          <div className='col-span-1 md:col-span-3 flex flex-col gap-4'>
            <div className='flex flex-col'>
              <h2 className='text-2xl font-semibold'>Redesign appartment in LA</h2>
              <p className='text-sm text-neutral-500'>Change on some spot with modern scandanavian style.</p>
            </div>

            <div className='w-full'>
              <ProjectDetailInfo />
            </div>
          </div>
          <div className='col-span-1 md:col-span-2'>
            <TeamSection />
          </div>
          <div className="md:col-span-5 col-span-1 flex flex-col gap-4">
            <PhasesSection />
          </div>
      </div>
    </div>
  );
}
