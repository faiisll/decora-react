import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '../inputs/Input';
import DialogModal from './Dialog';
import DatePicker from "../Calendar/DatePicker"
import { AnimatePresence, motion } from 'motion/react';
import clsx from 'clsx';

const DialogCreateTask = ({open = false, onChange = () => {}}) => {
    const initialValues = {
        phaseId: "",
        name: "",
        assignee: "",
        dueDate: ""
    };


    const validationSchema = Yup.object({
        phaseId: Yup.string().required("Phase field is required"),
        name: Yup.string()
            .required('Name field is required')
            .min(5, 'Name must be at least 5 characters'),
        assignee: Yup.string().required(),
        dueDate: Yup.string().required("Task due date is required.")
    });

    const handleSubmit = (values, actions) => {
        console.log('Submitted values:', values);
        actions.setSubmitting(false);
        // Here you'd probably close the dialog and call a parent handler
    };



    return (
        <DialogModal open={open} onToggle={onChange} size='w-2xl'>
            <div className='flex flex-col'>
                    <h2 className='text-center mb-4 font-semibold text-lg'>Create Tasks</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, values, setFieldValue, touched, errors}) => (
                            <Form>
                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                    <div className=' col-span-1 sm:col-span-3 grid grid-cols-subgrid gap-4 pb-2'>
                                        <div className='col-start-1 col-span-1 h-10'>
                                            <select value={values.phaseId} onChange={(e) => {setFieldValue("phaseId" ,e.target.value)}} name='phaseId' className={clsx("select", touched["phaseId"] && errors["phaseId"] && 'select-error')}>
                                                <option disabled={true} value={""}>Select the phase</option>
                                                <option value={"1"}>Crimson</option>
                                                <option value={"2"}>Amber</option>
                                                <option value={"3"}>Velvet</option>
                                            </select>
                                            {touched["phaseId"] && errors["phaseId"] ? (<p className="validator-hint text-red-500 mt-0">{errors["phaseId"]}</p>) : null}
                                        </div>
                                    </div>

                                    <div className=''>
                                        <Input disabled={isSubmitting} placeholder="Enter task name here" type="text" name="name"></Input>
                                    </div>
                                    <div className='pt-1'>
                                        <select value={values.assignee} onChange={(e) => {setFieldValue("assignee" ,e.target.value)}} className={clsx("select", touched["assignee"] && errors["assignee"] && 'select-error')}>
                                            <option disabled={true} value={""} className='text-neutral-200'>Assign task</option>
                                            <option value={"1"}>Crimson</option>
                                            <option value={"2"}>Amber</option>
                                            <option value={"3"}>Velvet</option>
                                        </select>
                                        {touched["assignee"] && errors["assignee"] ? (<p className="validator-hint text-red-500 mt-1">{errors["assignee"]}</p>) : null}

                                    </div>
                                    <div className='flex flex-col pt-1'>
                                        <DatePicker name='dueDate' showToggle={false} value={values.dueDate} onChange={(d) => {
                                            setFieldValue('dueDate', d)
                                        }}
                                        error={touched["dueDate"] && errors["dueDate"]}/>
                                        {touched["dueDate"] && errors["dueDate"] ? (<p className="validator-hint text-red-500 mt-1">{errors["dueDate"]}</p>) : null}
                                    </div>
                                </div>

                                <div className="modal-action flex">
                                    <button type="button" disabled={isSubmitting} onClick={() =>{onChange(false)}} className="btn btn-ghost">
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-neutral"
                                        disabled={isSubmitting}
                                    >
                                        Create
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div> 
        </DialogModal>
    );
};

export default DialogCreateTask;
