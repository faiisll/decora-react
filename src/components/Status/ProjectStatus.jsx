import clsx from 'clsx';
import React from 'react';

const ProjectStatus = ({status ="",className, ...props}) => {
    const lowerStatus = status.toLowerCase()

    const statusTheme = {
        'setup': "badge-neutral",
        'pending' : "badge-neutral",
        'ongoing': "badge-warning",
        'complete': "badge-success",
        'completed': "badge-success",
        'done': "badge-info",
        'canceled': "badge-error",
        'reject': "badge-error",
    }
    return (
        <div className={clsx("badge badge-soft", statusTheme[lowerStatus] ? statusTheme[lowerStatus] : "badge-neutral", className)} {...props}>
            {status}
        </div>
    );
}

export default ProjectStatus;
