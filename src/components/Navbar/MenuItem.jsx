import clsx from 'clsx'
import React from 'react'
import { NavLink } from 'react-router'

export default function MenuItem({Icon, name, isActive, ...props}) {
  return (
    <NavLink onClick={props.onClick} to={props.path}>
        <div className={clsx('flex gap-4 cursor-pointer text-lg  items-center hover:text-gray-950 transition-colors', isActive ? 'text-gray-900' : ' text-gray-400')}>
          <Icon style={{fontSize: "28px"}} />
          <span className='font-medium'>{name}</span>

        </div>
    </NavLink>
  )
}
