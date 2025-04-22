import { useState } from "react";
import DialogPhase from "../Dialog/DialogPhase";
import PhaseDisclosure from "./PhaseDisclosure";
import DialogCreateTask from "../Dialog/DialogCreateTask";
import DialogDetailTask from "../Dialog/DialogDetailTask";
import EmptyState from "../Empty/EmptyState";

const phasesDummy = [
  {
    id: 1,
    name: "Planning & check",
    status: "Ongoing",
    tasks: [
      {
        id: 1,
        name: "Visit location",
        status: "Done",
        assignee: "Faisal Ayash",
        endDate: "12/1/2025"
      },
      {
        id: 2,
        name: "Calculate the building",
        status: "Pending",
        assignee: "Jeki",
        endDate: "12/1/2025"
      },
    ]
  },
  {
    id: 2,
    name: "Create Design",
    status: "Pending",
    tasks: [
      {
        id: 1,
        name: "Prepare blueprint",
        status: "Pending",
        assignee: "Faisal",
        endDate: "12/1/2025"
      },
    ]
  },
];

export default function PhasesSection({phases = [], projectId = null}) {
  const [isDialogPhaseOpen,setIsDialogPhaseOpen] = useState(false)
  const [isDialogTaskOpen,setIsDialogTaskOpen] = useState(false)
  const [isDialogTaskDetailOpen,setIsDialogTaskDetailOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const openDialogPhase = () => {
    setIsDialogPhaseOpen(true)
  }
  const openDialogTask = () => {
    setIsDialogTaskOpen(true)
  }
  const openDialogTaskDetail = (task) => {
    setIsDialogTaskDetailOpen(true)
    setSelectedTask(task)
  }


  return (
      <div className="w-full flex flex-col gap-4">
        <DialogPhase projectId={projectId} id="dialog-phase" open={isDialogPhaseOpen} onChange={setIsDialogPhaseOpen} />
        <DialogCreateTask projectId={projectId} phases={phases} open={isDialogTaskOpen} onChange={setIsDialogTaskOpen} />
        <DialogDetailTask open={isDialogTaskDetailOpen} onChange={setIsDialogTaskDetailOpen} task={selectedTask} />
        {phases.length > 0 && <div className='flex justify-between items-center'>
          <h3 className='text-lg font-semibold'>Phase list</h3>
          <div className='flex gap-1'>
            <button className='btn btn-soft btn-sm' onClick={openDialogTask}>Create Task</button>
            <button className='btn btn-neutral btn-sm' onClick={openDialogPhase}>New Phase</button>
          </div>
        </div>}
        {phases.map((phase) => (
          <PhaseDisclosure
          key={phase.id}
          phase={phase}
          tasks={phase.tasks}
          onClickTask={openDialogTaskDetail} />
        ))}

        {!phases.length && <div className="w-full h-80">
          <EmptyState onClick={openDialogPhase} title="Project is empty" message="Let’s get started! Add a phase and task to begin your project journey" />
        </div> }

        
      </div>
  );
}
