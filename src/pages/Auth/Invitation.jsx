import React, { useEffect, useState } from 'react';
import Input from '../../components/inputs/Input';
import * as Yup from 'yup';
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import InputPassword from '../../components/inputs/InputPassword';
import configAxios from '../../config/configAxios';
import FullScreenLoader from '../../components/Loading/FullscreenLoader';
import createToast from '../../components/toast/Toast';
import { useVerificationMutation } from '../../store/apis/authApi';

const Invitation = () => {
    const navigate = useNavigate()
    const [loadToken, setLoadToken] = useState(false)
    let [searchParams] = useSearchParams();
    let [initialValues, setInitial] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    });
    

    const checkToken = async (token) => {
        setLoadToken(true)
        
        try {
            let res = await configAxios.get("/teams/invite/verify?token="+token)
            return res.data
        }catch(err){
            throw err.response.data.message
        }finally{
            setLoadToken(false)
        }
    }

    const init = () => {
        let token = searchParams.get("token")
        
        if(!token){
          navigate('/', { replace: true })
          return
        }
    
        checkToken(token).then((res) => {
    
            const dataInvite = res.data
            if(dataInvite){
                setInitial({ ...initialValues, email: dataInvite.email})
                initialValues.email = dataInvite.email
                createToast({
                    type: "success",
                    message: "Valid invitation link."
                })
            }
        }).catch(err => {
            createToast({
                type: "error",
                message: "Invalid invitation link."
            })
            navigate('/', { replace: true })
        })
    }

    useEffect(() => {
        init()
    }, [])
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required(),
        name: Yup.string().required(),
        password: Yup.string().min(6, 'Minimum 6 characters').required(),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required(),
    });

    const [verif, {isLoading}] = useVerificationMutation()
    const handleSubmit = (values) => {
        let token = searchParams.get("token")
        verif({...values, token}).unwrap().then((res) => {
            createToast({
                type: "success",
                message: "Welcome, you've verified"
            })

        }).catch(err => {
            createToast({
                type: "error",
                message: err.data.message
            })
        })
    };
    return (!loadToken ?
        <>
            <div className='flex flex-col text-left'>
                <div className="text-2xl font-semibold">Invitation</div>
                <p className="text-gray-500 mt-2 mb-10">
                    You got invited! Please complete the data to continue
                </p>

            </div>

            <div className='w-full flex flex-col text-left'>
                <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                    <Form className="flex flex-col">
                    {/* Email */}
                    <div className='mb-2'>
                        <Input disabled={true} placeholder="Enter your email" type="text" name="email"></Input>
                    </div>
                    <div className='mb-2'>
                        <Input disabled={isLoading} placeholder="Enter your name" type="text" name="name"></Input>
                    </div>
                    <div className='mb-2'>
                        <InputPassword disabled={isLoading} placeholder="Enter your password " name="password" />
                    </div>
                    <div className='mb-2'>
                        <InputPassword disabled={isLoading} placeholder="Enter confirm password " name="confirmPassword" />
                    </div>

                    <button type="submit" disabled={isLoading} className="btn btn-neutral mt-4">
                        Verif
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
        </> : <FullScreenLoader />
    );
}

export default Invitation;
