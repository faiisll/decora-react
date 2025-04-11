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
        icon: TbBorderNone
    },
    {
        id: 2,
        name: "Interior",
        description: "Use interior design project phases.",
        icon: TbContract
    },
]
const SelectTemplateProject = () => {
    let [selected, setSelected] = useState(templates[0].name)


    return (
      <RadioGroup value={selected} onChange={setSelected} aria-label="Project template" as='div' className="flex md:flex-row flex-col gap-2 w-full">
        {templates.map((template) => (
            <Radio value={template.name} key={template.id} className="h-full w-full md:w-1/2">
                {({checked}) => (
                    <CardProjectTemplate checked={checked} template={template} />
                )}
            </Radio>
        ))}
      </RadioGroup>
    )
}

export default SelectTemplateProject;
