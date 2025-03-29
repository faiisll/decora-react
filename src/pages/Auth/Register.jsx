import React from 'react';
import Input from '../../components/inputs/Input';

const Register = () => {
    return (
        <>
            <div className="text-2xl font-semibold">Take the creative leap!</div>
            <p className="text-gray-500 mt-2 mb-10">
                Create an account and discover your next exciting project
            </p>

            <div className='w-full flex flex-col gap-3'>
                <input
                placeholder='Enter your email'
                className='input focus:outline-none focus:ring-2 focus:ring-black w-full'/>
                <button className="btn w-full btn-primary">
                    Continue
                </button>

            </div>
            <div className="flex items-center my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="mx-2 text-gray-500">OR</span>
                <hr className="flex-1 border-gray-300" />
            </div>
            <p className="mt-4 text-gray-500">
                Already have an account? <a href="#" className="text-black font-semibold">Sign in</a>
            </p>
        </>
    );
}

export default Register;
