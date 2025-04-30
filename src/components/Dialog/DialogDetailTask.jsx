import React, { useEffect } from 'react'
import DialogModal from './Dialog'
import TaskItem from '../Project/TaskItem'
import { HiCloudDownload } from "react-icons/hi";
import CardActivity from '../Card/CardActivity';
import { useGetActivitiesQuery, useUpdateTaskMutation } from '../../store/apis/projectApi';
import { Form, Formik } from 'formik';
import Input from '../inputs/Input';
import * as Yup from "yup"
import clsx from 'clsx';
import createToast from '../toast/Toast';


export default function DialogDetailTask({open = false, onChange= (e) => {}, task = null, projectId}) {
    const {data:activities, isLoading, refetch} = useGetActivitiesQuery(task ? task.id : "")
    const [updateTask, {isLoading:loadingUpdate}] = useUpdateTaskMutation()


    const initialValue = {
        status: '',
        message: '',
        file: ''
    }

    const validationSchema = Yup.object({
        status: Yup.string().required(),
        message: Yup.string().min(5),
        file: Yup.string(),
    })

    const submit = async (values) => {
        const params = {
            body: values,
            projectId,
            taskId: task.id
        }

        await updateTask(params).unwrap().then(() => {
            createToast({
                message: "Task successfully updated.",
                type: "success"
            })

            onChange(false)
        }).catch((err) => {
            createToast({
                message: err.data.message,
                type: "error"
            })

        })
    }
    useEffect(() => {
        if(task){
            refetch(task.id)
        }
    }, [task])
    return (
        <DialogModal open={open} onToggle={onChange} size='md:w-2xl w-full overflow-y-auto'>
            <div className='w-full flex flex-col gap-4'>
                <h3>Task Detail</h3>
                {task && <TaskItem task={task} />}

                {task && task.status !== "Completed" && <Formik validationSchema={validationSchema} initialValues={initialValue} onSubmit={submit}>
                    {({setFieldValue, values, touched, errors}) => (
                        <Form className='w-full flex flex-col gap-4'>
                            <div className='flex flex-col'>
                                <select disabled={loadingUpdate} className={clsx("select select-bordered w-full" , touched["status"] && errors["status"] ? 'select-error' : '')} onChange={(e) => {setFieldValue("status" ,e.target.value)}} value={values["status"]}>
                                    <option disabled value={""}>Select update task status</option>
                                    {["Pending", "Reject"].includes(task.status) && <option value="Done">Done</option>}
                                    {task.status === "Done" && <option value="Reject">Reject</option>}
                                    {["Done", "Reject"].includes(task.status) && <option value="Completed">Completed</option>}

                                </select>
                                {touched["status"] && errors["status"] ? (<p className="validator-hint text-red-500 mt-1">{errors["status"]}</p>) : null}
                            </div>
                            <div>
                                <Input disabled={loadingUpdate} name="message" placeholder="Task update message" />
                            </div>
                            <input
                            disabled={loadingUpdate}
                            type="file" 
                            className="file-input w-full"
                            name='file'
                            onChange={e => {setFieldValue('file' ,e.target.files[0].name)}} />
                            <div className='flex justify-end gap-2'>
                                <button disabled={loadingUpdate} type='button' className='btn btn-ghost' onClick={() => {onChange(false)}}>Close</button>
                                <button disabled={loadingUpdate} type='submit' className='btn btn-neutral'>Update</button>
                            </div>
                        </Form>

                    )}
                </Formik>}

                {activities && activities.data && activities.data.length ?
                    <>
                        <span className='text-sm text-neutral-400 mb-2'>Activities</span>
                        <div className='max-h-52 flex flex-col overflow-y-auto gap-2'>
                            {!isLoading && activities && activities.data.map(act => (<CardActivity activity={act} key={act.id} message={act.message} name={act.user.name} />))}

                        </div>

                    </>: ""
                
                }

                {task && task.status === "Completed" && 
                    <div className='flex justify-end gap-2'>
                        <button type='button' className='btn btn-ghost' onClick={() => {onChange(false)}}>Close</button>
                    </div>
                }
                
            </div>

        </DialogModal>
    )
}
