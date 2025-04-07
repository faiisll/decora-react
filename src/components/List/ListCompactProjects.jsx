import React from 'react'
import CardProject from '../Card/CardProject'

const project = {
  name: "Redesign cozzy apartment",
  description: "Make interior with theme scandinavian",
  status: "Ongoing",
  endDate: "2 june",
  lead: "Hart Hagerty"
}

export default function ListCompactProjects() {
  return (
    <div className='grow max-h-[80vh] overflow-y-auto mt-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>

            <CardProject project={project} />
        </div>
    </div>
  )
}
