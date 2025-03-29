import React from 'react';
import { useField } from 'formik';
const Input = ({children, label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <>
        <fieldset className="fieldset w-full">
            {label && <legend className="fieldset-legend ">{label}</legend>}
            <label className={`input w-full focus:outline-none ${meta.touched && meta.error && 'input-error'}`}>
                {children}
                <input {...field} {...props}/>
            </label>
        </fieldset>
        {meta.touched && meta.error ? (<p className="validator-hint text-red-500 mt-0">{meta.error}</p>) : null}
        </>
    );
}

export default Input;
