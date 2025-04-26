import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import PhasesSection from '../../components/Project/PhasesSection';
import TeamSection from '../../components/Project/TeamSection';
import ChatSection from '../../components/Project/ChatSection';
import ProjectDetailInfo from '../../components/Project/ProjectDetailInfo';
import { useGetPhasesQuery, useGetProjectByIdQuery, useGetTasksQuery } from '../../store/apis/projectApi';
import { useParams } from 'react-router';
import { cloneDeep } from 'lodash';
import TimelineSection from '../../components/Project/TimelineSection';
import { useSelector } from 'react-redux';

export default function ProjectDetail() {
  let userData = useSelector((state) => state.auth.dataUser)
  const [tab, setTab] = useState("phase")
  let { id } = useParams();
  const {data, isLoading, refetch} = useGetProjectByIdQuery(id)
  const {data:phases, isLoading: loadingPhase, refetch: refetchPhase} = useGetPhasesQuery(id)
  const {data:tasks, isLoading: loadingTask, refetch: refetchTask} = useGetTasksQuery(id)

  useEffect(() => {
    refetchPhase()
    refetchTask()
  }, [])

  const phasesNTasks = useMemo(() => {
    if(loadingPhase || loadingTask || isLoading) return []
    if(!phases || !tasks) return []


    const copyPhases = cloneDeep(phases.data)

    return copyPhases.map(phase => {
      phase.tasks = tasks.data.filter(task => task.phaseId === phase.id)
      phase.status = phase.tasks.filter(task => task.status === "Completed").length ? "Completed" : "Ongoing"
      phase.status = phase.tasks.length ? phase.status : "Setup"
      return phase
    })
    

  }, [phases, tasks])

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
          <div className="flex justify-center bg-gray-100 rounded-lg p-1 w-fit">
            <div
            onClick={() => (setTab("phase"))} 
            className={clsx(tab === 'phase' && "bg-white rounded-lg shadow", "text-sm p-2 cursor-pointer text-nowrap")}>Phase & task</div>
            <div
            onClick={() => (setTab("chat"))} 
            className={clsx(tab === 'chat' && "bg-white rounded-lg shadow", "text-sm p-2 cursor-pointer")}>Chat</div>
          </div>
          </div>
          {tab === "phase" && <div className="md:col-span-5 col-span-1 flex flex-col gap-4">
            <PhasesSection phases={phasesNTasks} projectId={id} />
          </div> }
          {tab === "chat" && <div className="md:col-span-5 col-span-1 flex flex-col gap-4 w-full">
            {userData && <ChatSection projectId={id} user={userData} />}
          </div>}
      </div>
    </div> : ""
  );
}
