import React, { useEffect, useState } from 'react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'motion/react';
import clsx from 'clsx';

const DialogModal = ({ onToggle = () => {}, open = false, size = "w-sm", ...props}) => {
    let [isOpen, setIsOpen] = useState(false)
    
    useEffect(() => {
        setIsOpen(open)
    }, [open])



    const close = () => {
        if(!props.disabled){
            onToggle(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onClose={close} className="relative z-50">
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, }}
                    transition={{duration: 0.4}}
                    className="fixed font-poppins inset-0 bg-black/30 flex backdrop-blur-xs w-screen items-center justify-center p-4">
                        <DialogPanel
                        initial={{ opacity: 0, y: "10px" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-10px"}}
                        transition={{duration: 0.4}}
                        as={motion.div}
                        className={clsx("max-w-2xl space-y-4 shadow-lg rounded-lg bg-white p-8 max-h-full", size)}>
                            {props.children}
                        </DialogPanel>
                    </motion.div>
                </Dialog>

            )}
        </AnimatePresence>
    );
};

export default DialogModal;
