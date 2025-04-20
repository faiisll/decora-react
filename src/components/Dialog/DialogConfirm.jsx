import React from 'react'
import DialogModal from './Dialog'
import clsx from 'clsx'

const propsData = {
    children: null,
    open: false,
    onChange: () => {},
    onConfirm: () => {},
    title: "Are u sure ?",
    description: "This action cannot be undo!",
    confirmText: "Confirm",
    cancelText: "Cancel",
    confirmClass: "",
    cancelClass: "",
}

export default function DialogConfirm({
    open= false,
    onChange= () => {},
    onConfirm= () => {},
    title= "Are u sure ?",
    description= "This action cannot be undo!",
    confirmText= "Confirm",
    cancelText= "Cancel",
    confirmClass= "btn btn-neutral",
    cancelClass= "btn-ghost",}) {
  return (
    <DialogModal open={open} onToggle={onChange} size='w-lg'>
        <div className='w-full flex flex-col'>
            <h1 className='font-semibold text-lg mb-4'>{title}</h1>
            <p className='text-neutral-500 text-sm'>{description}</p>

            <div className='flex justify-end mt-10 gap-4'>
                <button className={clsx('btn btn-ghost', cancelClass)} onClick={() => {onChange(false)}}>{cancelText}</button>
                <button className={clsx('btn', confirmClass)} onClick={() => {onConfirm()}}>{confirmText}</button>
            </div>
        </div>
    </DialogModal>
  )
}
