import clsx from 'clsx';
import React from 'react';

const DayCard = ({data, selected = false, onClick = () => {},...props}) => {
    return (
        <div
        onClick={() => {onClick(data)}} {...props}
        className={clsx(
            "aspect-square flex items-center justify-center hover:bg-neutral-200 rounded cursor-pointer select-none transition-all",
            !data.isOtherMonth ? "text-neutral-900" : "text-neutral-400",
            selected ? "bg-neutral-800 text-white" : ""
        )}>
            {data && <span>{data.display}</span>}
        </div>
    );
}

export default DayCard;
