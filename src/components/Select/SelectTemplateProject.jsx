import React, { Fragment, useState } from 'react';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react'
import CardProject from '../Card/CardProject';
import CardProjectTemplate from '../Card/CardProjectTemplate';
import { TbBorderNone, TbContract } from "react-icons/tb";

const plans = ['Blank', 'Interior Flow']
const templates = [
    {
        id: 1,
        name: "Blank",
        description: "Start project from scratch.",
        icon: TbBorderNone,
        value: ""
    },
    {
        id: 2,
        name: "Interior",
        description: "Use interior design project phases.",
        icon: TbContract,
        value: "interior"
    },
]
const SelectTemplateProject = ({value = "", onChnage = () => {}}) => {
    let [selected, setSelected] = useState(templates[0].value)


    return (
      <RadioGroup value={value} onChange={onChnage} aria-label="Project template" as='div' className="flex md:flex-row flex-col gap-2 w-full">
        {templates.map((template) => (
            <Radio value={template.value} key={template.id} className="h-full w-full md:w-1/2">
                {({checked}) => (
                    <CardProjectTemplate checked={checked} template={template} />
                )}
            </Radio>
        ))}
      </RadioGroup>
    )
}

export default SelectTemplateProject;
