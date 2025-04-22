import React from 'react';
import ProjectStatus from '../Status/ProjectStatus';
import { TbExchange, TbCalendarMonth  } from "react-icons/tb";
import moment from 'moment';

const ProjectDetailInfo = ({status = "Ongoing", startDate = "21/02/2025", endDate ="21/02/2025"}) => {
    const parseDateJoin = (date) => {
        return moment(date).format("D MMM, YYYY")
    }
    return (
        <div className="stats stats-vertical md:stats-horizontal w-full bg-gray-100 rounded-2xl">
            <div className="stat">
                <div className="stat-figure text-neutral">
                    <TbExchange className='text-2xl' />
                </div>
                <div className="stat-title">Status</div>
                <div className="stat-value">
                    <ProjectStatus status={status} className="badge-lg" />
                </div>
            </div>

            <div className="stat">
                <div className="stat-figure text-neutral">
                    <TbCalendarMonth className='text-2xl' />
                </div>
                <div className="stat-title">Start At</div>
                <div className="stat-value text-2xl">{parseDateJoin(startDate)}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-neutral">
                    <TbCalendarMonth className='text-2xl' />
                </div>
                <div className="stat-title">Due Date</div>
                <div className="stat-value text-2xl">{parseDateJoin(endDate)}</div>
            </div>
            </div>
    );
}

export default ProjectDetailInfo;
