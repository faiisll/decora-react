import clsx from 'clsx';
import React from 'react';

const Cell = ({children, className =""}) => {
    return (
        <td className={clsx("px-6 py-4 whitespace-nowrap text-sm text-gray-500", className)}>
            {children}
        </td>
    );
}

export default Cell;
