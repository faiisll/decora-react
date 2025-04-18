import { useState } from 'react';
import clsx from 'clsx';
import PhasesSection from '../../components/Project/PhasesSection';
import TeamSection from '../../components/Project/TeamSection';
import ChatSection from '../../components/Project/ChatSection';
import ProjectDetailInfo from '../../components/Project/ProjectDetailInfo';
import { useGetProjectByIdQuery } from '../../store/apis/projectApi';
import { useParams } from 'react-router';

export default function ProjectDetail() {
  const [tab, setTab] = useState("phase")
  let { id } = useParams();
  const {data, isLoading, refetch} = useGetProjectByIdQuery(id)

  return (
    data && !isLoading ? <div className="pt-8 space-y-8 w-full pb-10">
      <div className="grid md:grid-cols-5 md:grid-rows-1 grid-rows-1 gap-4 grid-cols-1">
          <div className='col-span-1 md:col-span-3 flex flex-col gap-4'>
            <div className='flex flex-col'>
              <h2 className='text-2xl font-semibold'>{data.data.name}</h2>
              <p className='text-sm text-neutral-500'>{data.data.description}</p>
            </div>

            <div className='w-full'>
              <ProjectDetailInfo status={data.data.status} startDate={data.data.startDate} endDate={data.data.endDate}/>
            </div>
          </div>
          <div className='col-span-1 md:col-span-2'>
            <TeamSection teams={data.data.teams} />
          </div>
          <div className='w-full'>
          <div className="tabs tabs-box w-fit">
            <input 
            type="radio" 
            checked={tab === 'phase'} 
            onChange={(e) => (setTab(e.target.value))}  
            name="team_tab" 
            value="phase" 
            className="tab" 
            aria-label="Phase & Task"/>
            <input 
            type="radio" 
            checked={tab === 'timeline'} 
            onChange={(e) => (setTab(e.target.value))} 
            name="team_tab" 
            value="timeline" 
            className="tab" 
            aria-label="Timeline"  />
          </div>
          </div>
          {tab === "phase" ? <div className="md:col-span-5 col-span-1 flex flex-col gap-4">
            <PhasesSection />
          </div> : <div className="md:col-span-5 col-span-1 flex flex-col gap-4">timeline</div>}
      </div>
    </div> : ""
  );
}
