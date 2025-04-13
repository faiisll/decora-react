import clsx from 'clsx';
import React from 'react';

const CardProjectTemplate = ({checked = false, name = "", template}) => {
    return (
        <div className={clsx(
            "p-10 border  rounded cursor-pointer transition-all hover:border-blue-500",
            checked ? "bg-neutral-100 border-neutral-600" : "bg-gray-50 border-1 border-gray-50"
        )}>
            <div className='flex gap-2'>
                <template.icon className="w-6 h-6" />
                <div className='flex flex-col'>
                    <span>{template.name}</span>
                    <span className='text-xs text-neutral-500'>{template.description}</span>
                </div>
            </div>
            
        </div>
    );
}

export default CardProjectTemplate;
