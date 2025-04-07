import React, { useState } from 'react';
import Input from '../../components/inputs/Input';
import InputPassword from '../../components/inputs/InputPassword';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router';
import createToast from '../../components/toast/Toast.jsx';
import { useDispatch } from 'react-redux'
import {setAuth} from "../../store/authSlice.js"

const Login = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const initialForm = {
        email: "",
        password: ""
    }
    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })

    const handleSubmit = (values, { setSubmitting }) => {
        setLoading(true)
        setTimeout(() => {
            dispatch(setAuth(true))
            createToast({
                type: "wa",
                message: "failed generate"
            })
            setLoading(false)
        }, 1400);
    }
    return (
        <>
            <div className='flex flex-col text-left'>
                <div className="text-2xl font-semibold">Sign In</div>
                <p className="text-gray-500 mt-2 mb-10">
                    Organize, collaborate, and execute with ease on one intuitive platform.
                </p>

            </div>

            <Formik
            initialValues={initialForm}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
                <Form>
                    <div className='w-full flex flex-col gap-3'>
                        <div className='flex flex-col text-left'>
                            <Input disabled={loading} placeholder="Enter your email here" type="text" name="email"></Input>
                        </div>
                        <div className='flex flex-col text-left'>
                            <InputPassword disabled={loading} placeholder="Enter your password here" name="password"/>
                        </div>
                        <button disabled={loading} type='submit' className="btn w-full btn-neutral">
                            {loading ?<span className='loading loading-spinner'></span> :
                            <span>Login</span>}
                        </button>

                    </div>

                </Form>

            </Formik>
            <p className="mt-10 text-gray-500">
                Don't have an account yet? <NavLink to="/register" className="text-black font-semibold">Sign up now! </NavLink>
            </p>
        </>
    );
}

export default Login;
