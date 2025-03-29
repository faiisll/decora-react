import React, { useState } from 'react';
import { useField } from 'formik';
import { TbKey, TbEye, TbEyeClosed  } from "react-icons/tb";
const InputPassword = ({icon,label, ...props}) => {
    const [visible, setVisible] = useState(false)
    const [field, meta] = useField(props)
    return (
        <>
        <fieldset className="fieldset w-full">
            {label && <legend className="fieldset-legend ">{label}</legend>}
            <label className={`input w-full focus:outline-none ${meta.touched && meta.error && 'input-error'}`}>
                {icon && <TbKey />}
                <input type={visible ? 'text' : 'password'} {...field} {...props}/>
                <div onClick={() => {setVisible(!visible)}} className='text-lg cursor-pointer'>{!visible ? <TbEye /> : <TbEyeClosed />}</div>
            </label>
        </fieldset>
        {meta.touched && meta.error ? (<p className="validator-hint text-red-500 mt-0">{meta.error}</p>) : null}
        </>
    );
}

export default InputPassword;
