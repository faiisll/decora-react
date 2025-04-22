import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { AnimatePresence, easeOut, motion } from 'motion/react';
import React, { Fragment } from 'react';
import PhaseItem from './PhaseItem';
import TaskItem from './TaskItem';


const dummy = {
    name: "",
    status: ""
}
const PhaseDisclosure = ({
    phase = {...dummy},
    tasks = [],
    onEditPhase = () => {},
    onDeletePhase = () => {},
    onClickTask = () => {}

}) => {
    return (
        <Disclosure as="div" className="w-full transition-all">
        {({open}) => (
          <>
            <DisclosureButton className="w-full">
              <PhaseItem
              onEdit={(p) => {onEditPhase(p)}} 
              onDelete={(p) => {onDeletePhase(p)}}
              open={open} 
              phase={phase} />
            </DisclosureButton>
            <div className='overflow-hidden'>
              <AnimatePresence>
                {open && (
                  <DisclosurePanel as={Fragment} static>
                    <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0, transition: {delay: (tasks.length * 0.15)+0.15} }}
                    transition={{ duration: 0.2}}
                    className='w-full'>
                      {!tasks.length && <motion.div
                      layout
                      initial={{ opacity: 0, y: -5, x: -24 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, y: -20, x: -24, transition: {duration: 0.15, ease: easeOut} }}
                      transition={{ duration: 0.15, ease: easeOut, }}
                      className="origin-top mt-2 pl-4 text-neutral-500">
                        {phase.name} is empty.
                      </motion.div>}
                      {tasks.map((task, index) => (
                        <motion.div
                        layout
                        key={task.id}
                        initial={{ opacity: 0, y: -5, x: -24 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -20, x: -24, transition: {duration: 0.15, ease: easeOut, delay: (tasks.length-index) * 0.15} }}
                        transition={{ duration: 0.15, ease: easeOut, delay: (index+1) * 0.15 }}
                        className="origin-top mt-2 pl-4">
                            <TaskItem task={task} onClick={() => {onClickTask(task)}} />
                        </motion.div>
                      ))}

                    </motion.div>
                  </DisclosurePanel>)
                
                }
              </AnimatePresence>
            </div>

          </>
        )}
    </Disclosure>
    );
}

export default PhaseDisclosure;
