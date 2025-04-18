import React from 'react'
import CardProject from '../Card/CardProject'


export default function ListCompactProjects({data = []}) {
  return (
    <div className='grow max-h-[80vh] overflow-y-auto mt-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>

            {data.map((project) => <CardProject key={project.id} project={project} />)}
        </div>
    </div>
  )
}
