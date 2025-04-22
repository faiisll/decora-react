import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '../inputs/Input';
import DialogModal from './Dialog';
import DatePicker from "../Calendar/DatePicker"
import { AnimatePresence, motion } from 'motion/react';
import clsx from 'clsx';
import { useCreateTaskMutation, useGetProjectByIdQuery } from '../../store/apis/projectApi';
import moment from 'moment';
import createToast from '../toast/Toast';

const DialogCreateTask = ({open = false, onChange = () => {}, projectId = null, phases = []}) => {
    const [createTask, {isLoading}] = useCreateTaskMutation()
    const {data:project} = useGetProjectByIdQuery(projectId)
    const initialValues = {
        projectId,
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
        const parsedDate = moment(values.dueDate, "DD-M-YYYY").format()
        values.dueDate = parsedDate

        createTask(values).unwrap().then(res => {
            createToast({
                message: "Phase successfully created",
                type: "success"
            })
            onChange(false)

        }).catch(err => {
            createToast({
                message: err.data.message,
                type: "error"
            })
        })
    };



    return (
        <DialogModal open={open} onToggle={onChange} size='w-2xl'>
            <div className='flex flex-col'>
                    <h2 className='text-center mb-4 font-semibold text-lg'>Create Task</h2>
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
                                            <select disabled={isLoading} value={values.phaseId} onChange={(e) => {setFieldValue("phaseId" ,e.target.value)}} name='phaseId' className={clsx("select", touched["phaseId"] && errors["phaseId"] && 'select-error')}>
                                                <option disabled={true} value={""}>Select the phase</option>
                                                {phases.map(phase => (<option key={phase.id} value={phase.id}>{phase.name}</option>))}
                                            </select>
                                            {touched["phaseId"] && errors["phaseId"] ? (<p className="validator-hint text-red-500 mt-0">{errors["phaseId"]}</p>) : null}
                                        </div>
                                    </div>

                                    <div className=''>
                                        <Input disabled={isLoading} placeholder="Enter task name here" type="text" name="name"></Input>
                                    </div>
                                    <div className='pt-1'>
                                        <select disabled={isLoading} value={values.assignee} onChange={(e) => {setFieldValue("assignee" ,e.target.value)}} className={clsx("select", touched["assignee"] && errors["assignee"] && 'select-error')}>
                                            <option disabled={true} value={""} className='text-neutral-200'>Assign task</option>
                                            {project && project.data.teams.map(person => <option key={person.email} value={person.email}>{person.name}</option>)}
                                        </select>
                                        {touched["assignee"] && errors["assignee"] ? (<p className="validator-hint text-red-500 mt-1">{errors["assignee"]}</p>) : null}

                                    </div>
                                    <div className='flex flex-col pt-1'>
                                        <DatePicker
                                        disabled={isLoading}
                                        name='dueDate'
                                        showToggle={false}
                                        value={values.dueDate}
                                        onChange={(d) => {
                                            setFieldValue('dueDate', d)
                                        }}
                                        error={touched["dueDate"] && errors["dueDate"]}/>
                                        {touched["dueDate"] && errors["dueDate"] ? (<p className="validator-hint text-red-500 mt-1">{errors["dueDate"]}</p>) : null}
                                    </div>
                                </div>

                                <div className="modal-action flex">
                                    <button type="button" disabled={isLoading} onClick={() =>{onChange(false)}} className="btn btn-ghost">
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-neutral"
                                        disabled={isLoading}
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
