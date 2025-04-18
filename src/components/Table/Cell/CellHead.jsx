import clsx from 'clsx';
import React from 'react';

const CellHead = ({children, className}) => {
    return (
        <th className={clsx("px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-nowrap", className)}>
            {children}
        </th>
    );
}

export default CellHead;
