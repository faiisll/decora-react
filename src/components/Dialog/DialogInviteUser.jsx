import React from 'react';
import DialogModal from './Dialog';
import * as Yup from 'yup';
import Input from '../inputs/Input';
import { Form, Formik } from 'formik';
import clsx from 'clsx';
import { useInviteTeamMutation } from '../../store/apis/teamApi';
import createToast from '../toast/Toast';

const DialogInviteUser = ({open, onChange}) => {
    const [invite, {isLoading}] = useInviteTeamMutation()
    
    const initialValues = {
        email: '',
        role: '',
        roleTag: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        role: Yup.string().required(),
        roleTag: Yup.string().min(3, 'Job title must be at least 2 characters')
    })

    close = () => {
        if(!isLoading){
            onChange(false)
        }
    }


    const onSubmit = (values) => {
        invite(values).unwrap().then(res => {
            createToast({
                message: "Invitation link has been sent",
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
    return (
        <DialogModal disabled={isLoading} size='w-md' open={open} onToggle={onChange}>
            <div className='flex flex-col'>
                <h2 className='text-center font-semibold text-lg'>Invite User</h2>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({values, setFieldValue, touched, errors}) => <Form>
                    <div className="mb-2">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                        disabled={isLoading}
                        name="email"
                        type="text"
                        placeholder="Enter user email"
                        />
                    </div>
                    <div className='w-full mb-2'>
                        <label className="block text-sm font-medium mb-2">Role</label>
                        <select 
                        disabled={isLoading} 
                        value={values.role} 
                        onChange={(e) => {setFieldValue('role', e.target.value)}} 
                        className={clsx("select w-full", touched.role && errors.role && "select-error")}>
                            <option disabled={true} value="">Pick a role</option>
                            <option value={'Admin'}>Admin</option>
                            <option value={'Worker'}>Worker</option>
                            <option value={'Client'}>Client</option>
                        </select>

                        {touched.role && errors.role ? (<p className="validator-hint text-red-500 mt-1">{errors.role }</p>) : null}
                    </div>
                    <div className='w-full mb-2'>
                        <label  className="block text-sm font-medium mb-2">Job title</label>
                        <Input
                        disabled={isLoading}
                        name="roleTag"
                        type="text"
                        placeholder="Enter job title"/>
                    </div>
                    <div className="flex justify-end mt-4 gap-2">
                        <button className="btn btn-ghost" type='button' onClick={close} 
                        disabled={isLoading}>Close</button>
                        <button className='btn btn-neutral' type='submit' 
                        disabled={isLoading}>Invite</button>
                    </div>
                        
                    </Form>}
                    
                </Formik>
                
            </div>
        </DialogModal>
    );
}

export default DialogInviteUser;
