import React from 'react'

export default function UnitSelectedUsers({selectedPerson}) {
  return (
    <div className='flex gap-2 items-center'>
        {selectedPerson[0].name}
        {selectedPerson.length > 1 &&
            <div className="tooltip">
                <div className="tooltip-content">
                    <div className="">{selectedPerson.map(p => p.name).join(", ")}</div>
                </div>
                <div class="badge badge-soft badge-sm badge-neutral">+{(selectedPerson.length - 1)}</div>
          </div>
        }
    </div>
  )
}

