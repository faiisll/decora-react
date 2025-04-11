import clsx from 'clsx';
import React from 'react';
import { TbChevronDown, TbChevronUp, TbPencil, TbTrash } from "react-icons/tb";
import ProjectStatus from '../Status/ProjectStatus';

const dummy = {
    name: "tes",
    status: "tes"
}
const PhaseItem = ({open = false, phase = {...dummy}, onEdit = () => {}, onDelete = () => {}}) => {
    return (
        <div className={clsx('w-full bg-gray-100 rounded-xl flex flex-col md:flex-row gap-4 px-6 py-4 justify-between items-center', open && 'shadow-md')}>
            <div className='flex gap-2 md:flex-row flex-col items-center'>
                <span className='line-clamp-1'>{phase.name}</span>
                <ProjectStatus status={phase.status} />
            </div>

            <div className='flex gap-2'>
                <label className="btn btn-circle swap swap-rotate">
                    <TbChevronDown className={clsx(open ? "swap-on" : "swap-off")} />
                    <TbChevronUp className={clsx(!open ? "swap-on" : "swap-off")} />
                </label>
                <span
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit(phase)
                }}
                className='btn btn-circle btn-neutral'>
                    <TbPencil />
                </span>
                <span
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(phase)
                }}
                className='btn btn-circle btn-error'>
                    <TbTrash />
                </span>
                
            </div>


        </div>
    );
}

export default PhaseItem;
