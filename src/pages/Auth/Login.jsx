import React from 'react';
import Input from '../../components/inputs/Input';
import InputPassword from '../../components/inputs/InputPassword';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const initialForm = {
        email: "",
        password: ""
    }
    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })

    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            console.log(values)
        }, 400);
    }
    return (
        <>
            <div className="text-2xl font-semibold">Take the creative leap!</div>
            <p className="text-gray-500 mt-2 mb-10">
                Create an account and discover your next exciting project
            </p>

            <Formik
            initialValues={initialForm}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
                <Form>
                    <div className='w-full flex flex-col gap-3'>
                        <div className='flex flex-col text-left'>
                            <Input placeholder="Enter your email here" type="text" name="email"></Input>
                        </div>
                        <div className='flex flex-col text-left'>
                            <InputPassword placeholder="Enter your password here" name="password"/>
                        </div>
                        <button type='submit' className="btn w-full btn-neutral">
                            Login
                        </button>

                    </div>

                </Form>

            </Formik>
            <p className="mt-10 text-gray-500">
                Don't have an account yet? <a href="#" className="text-black font-semibold">Sign up now!</a>
            </p>
        </>
    );
}

export default Login;
