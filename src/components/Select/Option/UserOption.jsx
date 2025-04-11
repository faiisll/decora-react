import React, { useEffect } from 'react'
import { TbCircleCheckFilled } from "react-icons/tb";
import { ListboxOption } from '@headlessui/react'
import clsx from 'clsx'

export default function UserOption({data, isSelected}) {
    return (
        <ListboxOption as='div' value={data} className={clsx(
            "py-2 pl-2 w-full transition-all cursor-pointer flex gap-2 items-center select-none",
            !isSelected ? "hover:bg-neutral-300 bg-white" : "bg-neutral-800 text-white hover:bg-neutral-600"
        )}>
            <div className='w-4'>
                {isSelected && <TbCircleCheckFilled className='text-green-300' />}
            </div>
            {data.name} 
        </ListboxOption>
    )
}
