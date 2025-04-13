import clsx from 'clsx';
import React from 'react';
import { Tooltip } from 'react-tooltip';

const TeamAvatar = ({name = "", role="", rounded = "rounded-xl", textSize="text-lg", useTooltip = true}) => {
    const arrName = name.split(" ")
    const firstL = arrName[0][0].toUpperCase()
    const secL = arrName.length > 1 ? arrName[1][0].toUpperCase() : ""
  
    const themes = [
      "text-amber-200 border-ember-300",
      "text-blue-200 border-blue-300",
      "text-emerald-200 border-emerald-300",
      "text-fuchsia-200 border-fuchsia-300",
      "text-green-200 border-green-300",
      "text-orange-200 border-orange-300",
      "text-indigo-200 border-indigo-300",
      "text-pink-200 border-pink-300",
      "text-red-200 border-red-300"
    ]
  
    const randomId = parseInt(Math.random()*1000)
    const randomNumber = Math.floor(Math.random() * 9);
    const classN = clsx("avatar-tooltip w-full h-full flex justify-center items-center bg-neutral", themes[randomNumber], rounded)
    return (
      <>
        {useTooltip && <Tooltip id={`avatar-tooltip-${randomId}`} place="top">
          {name} {role && `(${role})`}
        </Tooltip>}
        <div data-tooltip-id={`avatar-tooltip-${randomId}`} className={classN}>
            <span className={textSize}>
              {firstL}{secL}
            </span>
        </div>
      </>
  
    )
  }

export default TeamAvatar;
