import React from 'react'
import RowTeam from './Row/RowTeam'
import CellHead from './Cell/CellHead'
import ProjectRow from './Row/ProjectRow'

const headers = ["No.", "Name", "Status", "Leader", "Due Date", ""]
export default function TableProject({data = [], loading = false}) {
  return (
    <div className="overflow-x-auto grow max-h-[80vh]">
      <div className="overflow-x-auto bg-neutral-50 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((head, index) => (
                <CellHead key={index}>{head}</CellHead>
              ))}
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
                {!loading && data.map((project, index) => (
                  <ProjectRow index={index} project={project} key={index} />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}