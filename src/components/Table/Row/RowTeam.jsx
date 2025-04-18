import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import TeamAvatar from '../../Project/TeamAvatar';
import Cell from '../Cell/Cell';


const RowTeam = ({user, index}) => {
    const parseDateJoin = (date) => {
        return moment(date).format("Do MMM, YYYY")
    }
    return (
        <tr className={clsx((index+2)%2 === 0 ? 'bg-gray-100' : 'bg-gray-50')}>
            <Cell className="text-gray-900 font-medium">
                {index+1}
            </Cell>
            <Cell className="text-gray-900 font-medium">
                <div className='flex gap-3 items-center'>
                    <div className='w-8 h-8 aspect-square'>
                        <TeamAvatar useTooltip={false} name={user.name ? user.name : user.email} />
                    </div>

                    <span>{user.name ? user.name : user.email}</span>

                </div>
            </Cell>
            <Cell>
                {user.email}
            </Cell>
            <Cell>
                {user.role}
            </Cell>
            <Cell>
                {user.roleTag ? user.roleTag : user.role}
            </Cell>
            <Cell>
                {parseDateJoin(user.createdAt)}
            </Cell>
            <Cell className="font-medium">
                {user.role.toLowerCase() !== 'owner' && <button className="btn btn-soft btn-sm btn-error">Remove</button>}
            </Cell>
        </tr>
    );
}

export default RowTeam;
