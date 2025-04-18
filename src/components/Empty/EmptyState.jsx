import React from 'react';
import { TbLayoutGridAdd } from "react-icons/tb";
const EmptyState = ({title = "No Data", message = "Please add the data first.", onClick = () => {}, Icon = TbLayoutGridAdd}) => {
    return ( 
        <div className='w-full h-full flex flex-col justify-center items-center cursor-pointer' onClick={onClick}>
            <div className='text-3xl text-neutral-500 mb-4'>
                <Icon />
            </div>
            <div className='flex flex-col items-center'>
                <div className='text-lg text-neutral-800'>{title}</div>
                <div className='text-sm text-neutral-400 max-w-sm text-center'>{message}</div>

            </div>

            
        </div>
    );
}

export default EmptyState;
