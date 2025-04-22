import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '../inputs/Input';
import DialogModal from './Dialog';
import { AnimatePresence, motion } from 'motion/react';
import { useCreatePhaseMutation } from '../../store/apis/projectApi';
import createToast from '../toast/Toast';

const DialogPhase = ({ phase = null, open = false, projectId = null, onChange = () => {}}) => {
    const [createPhase, {isLoading}] = useCreatePhaseMutation()
    const initialValues = {
        name: phase?.name || '',
        description: phase?.description || ''
    };


    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters'),
        description: Yup.string()
            .required('Description is required')
            .min(3, 'Description must be at least 3 characters'),
    });

    const handleSubmit = (values, actions) => {
        createPhase({...values, projectId}).unwrap().then(res => {
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
        
        // Here you'd probably close the dialog and call a parent handler
    };



    return (
        <DialogModal open={open} onToggle={onChange} >
            <div className='flex flex-col'>
                    <h2 className='text-center mb-4 font-semibold text-lg'>New Phase</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-2">
                                    <Input disabled={isLoading} placeholder="Enter phase name here" type="text" name="name"></Input>
                                </div>
                                <div className="mb-4">
                                    <Input disabled={isLoading} placeholder="Enter phase description here" type="text" name="description"></Input>
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

export default DialogPhase;


{/* <div className='flex flex-col'>
                    <h2 className='text-center font-semibold text-lg mb-4'>New Phase</h2>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-4">
                                    <Input disabled={isSubmitting} placeholder="Enter phase name here" type="text" name="name"></Input>
                                </div>

                                <div className="modal-action flex">
                                    <button type="button" disabled={isSubmitting} onClick={close} className="btn btn-ghost">
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
                </div> */}