import React from 'react'
import { TbBuildingCommunity, TbRulerMeasure, TbHomeCheck  } from "react-icons/tb";

export default function DashboardProjectStat({data, loading}) {
  return (
    <div className="stats bg-gray-100 w-full">
        <div className="stat">
            <div className="stat-figure text-neutral">
                <TbBuildingCommunity className='w-8 h-8' />
            </div>
            <div className="stat-title">Total Project</div>
            <div className="stat-value">
                {loading && !data ? <div className="skeleton h-8 bg-gray-200 w-10"></div> : data.total}
            </div>
        </div>

        <div className="stat">
            <div className="stat-figure text-amber-400">
                <TbRulerMeasure className='w-8 h-8' />

            </div>
            <div className="stat-title">In Progress</div>
            <div className="stat-value">
                {loading && !data ? <div className="skeleton h-8 bg-gray-200 w-10"></div> : data.totalInprogress}
            </div>
        </div>

        <div className="stat">
            <div className="stat-figure text-emerald-400">
                <TbHomeCheck  className='w-8 h-8' />
            </div>
            <div className="stat-title">Completed</div>
            <div className="stat-value">
                {loading && !data ? <div className="skeleton h-8 bg-gray-200 w-10"></div> : data.totalCompleted}
            </div>
        </div>
    </div>
  )
}
