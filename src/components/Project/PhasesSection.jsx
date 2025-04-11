import { useState } from "react";
import DialogPhase from "../Dialog/DialogPhase";
import PhaseDisclosure from "./PhaseDisclosure";

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

export default function PhasesSection({phases = phasesDummy}) {
  const [isDialogPhaseOpen,setIsDialogPhaseOpen] = useState(false)
  const openDialogPhase = () => {
    setIsDialogPhaseOpen(true)
  }


  return (
      <div className="w-full flex flex-col gap-4">
        <DialogPhase id="dialog-phase" open={isDialogPhaseOpen} onChange={setIsDialogPhaseOpen} />
        <div className='flex justify-between items-center'>
          <h3 className='text-lg font-semibold'>Phase list</h3>
          <div className='flex gap-1'>
            <button className='btn btn-soft btn-sm'>Create Task</button>
            <button className='btn btn-neutral btn-sm' onClick={openDialogPhase}>New Phase</button>

          </div>
        </div>
        {phases.map((phase) => (
          <PhaseDisclosure key={phase.id} phase={phase} tasks={phase.tasks} />
        ))}

        
      </div>
  );
}
