import React from 'react'
import MenuItem from './MenuItem'

export default function Menus({datas = [], currentUrl="", ...props}) {
  return (
    <div className='flex flex-col gap-6' {...props}>
        {datas.map(menu => <MenuItem key={menu.id} Icon={menu.icon} name={menu.name} isActive={currentUrl.includes(menu.path)} {...menu} />)}
    </div>
  )
}
