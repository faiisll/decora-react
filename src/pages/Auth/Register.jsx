import React from 'react';
import Input from '../../components/inputs/Input';
import * as Yup from 'yup';
import { NavLink } from 'react-router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import InputPassword from '../../components/inputs/InputPassword';
import { useRegisterMutation } from '../../store/apis/authApi';
import createToast from '../../components/toast/Toast';

const Register = () => {
    const [regis, {isLoading}] = useRegisterMutation()
    const initialValues = {
        email: '',
        name: '',
        companyName: '',
        password: '',
        confirmPassword: '',
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required(),
        name: Yup.string().required(),
        companyName: Yup.string().required("The company name is required."),
        password: Yup.string().min(6, 'Minimum 6 characters').required(),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required(),
    });

    const handleSubmit = (values) => {
        regis(values).unwrap().then(() => {
            createToast({
                type: "success",
                message: "Welcome, you've registered"
            })
        }).catch((err) => {
            createToast({
                type: "error",
                message: err.data.message
            })
        })

    };
    return (
        <>
            <div className='flex flex-col text-left'>
                <div className="text-2xl font-semibold">Take the creative leap!</div>
                <p className="text-gray-500 mt-2 mb-10">
                    Create an account and discover your next exciting project
                </p>

            </div>

            <div className='w-full flex flex-col text-left'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="flex flex-col">
                    {/* Email */}
                    <div className='mb-2'>
                        <Input placeholder="Enter your email" type="text" name="email"></Input>
                    </div>
                    <div className='mb-2'>
                        <Input placeholder="Enter your name" type="text" name="name"></Input>
                    </div>
                    <div className='mb-2'>
                        <Input placeholder="Enter your company name" type="text" name="companyName"></Input>
                    </div>
                    <div className='mb-2'>
                        <InputPassword placeholder="Enter your password " name="password" />
                    </div>
                    <div className='mb-2'>
                        <InputPassword placeholder="Enter confirm password " name="confirmPassword" />
                    </div>

                    <button type="submit" className="btn btn-neutral mt-4">
                        Register
                    </button>
                    </Form>
                </Formik>

            </div>
            <div className="flex items-center my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="mx-2 text-gray-500">OR</span>
                <hr className="flex-1 border-gray-300" />
            </div>
            <p className="mt-10 text-gray-500">
                Already have an account ? <NavLink to="/login" className="text-black font-semibold">Sign in here. </NavLink>
            </p>
        </>
    );
}

export default Register;
