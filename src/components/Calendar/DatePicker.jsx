import React, { useEffect, useMemo, useRef, useState } from 'react';
import Calendar from './Calendar';
import { TbCalendarMonth, TbCircleX  } from "react-icons/tb";
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import { validateDate } from '../../helpers/DateHelper';

const DatePicker = ({disabled, multiple = false, value, onChange = (date) => {console.log(date)}, name = "", showToggle = true, error = false}) => {
    const calendarRef = useRef(null)
    const [dateRange, setDateRange] = useState([null, null])
    const [dateSingle, setDateSingle] = useState("")
    const [calendarVisible, setCalendarVisible] = useState(false)

    const isClearableRange = useMemo(() => {
        let notNull = dateRange.every((d) => d !== null)
        return notNull
    }, [dateRange])

    const isClearableSingle = useMemo(() => {
        return dateSingle !== ""
    }, [dateSingle])

    const isClearable = useMemo(() => {
        if(multiple){
            return isClearableRange
        }else{
            return isClearableSingle
        }

    }, [isClearableRange, isClearableSingle])

    const maskedValue = useMemo(() => {
        if(!isClearable) return ""
        if(multiple) return `${dateRange[0]}-${dateRange[1]}`
        else{
            return dateSingle
        }

    }, [dateRange, isClearable, dateSingle])

    const date = useMemo(() => {

        return multiple ? dateRange : dateSingle

    }, [dateRange, dateSingle])

    const clear = () => {
        if(multiple){
            setDateRange([null, null])
        }else{
            setDateSingle("")
        }
    }

    function sortDates(dateArray) {
        return dateArray
        .map(date => {
        // Split the date into day, month, year and create a Date object
        let [day, month, year] = date.split("/").map(Number);
        return new Date(year, month - 1, day); // Months are 0-indexed in JavaScript Date
        })
        .sort((a, b) => a - b) // Sort the Date objects
        .map(date => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`); // Convert back to string
    }


    const chooseDate = (val) => {
        if(multiple){
            setDateRange(sortDates(val))
        }else{
            setDateSingle(val)
        }

        setCalendarVisible(false)
    }

    // Handle clicks outside of the calendar to close it
    const handleClickOutside = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
            setCalendarVisible(false)
        }
    }

    useEffect(() => {
        // Add the event listener for clicks outside
        document.addEventListener('mousedown', handleClickOutside)
        
        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const renderValue = () => {
        if(!multiple){
            setDateSingle(value)
            return
        }
        if(!Array.isArray(value)) {
            setDateRange([null, null])
            return
        }
        
        if(value.length !== 2){
            setDateRange([null, null])
            return

        }

        const allValidDate = value.every((v) => validateDate(v))
        if(!allValidDate) setDateRange([null, null])

        setDateRange(value)
    }

    useEffect(() => {
        renderValue()
    }, [])

    useEffect(() => {
        if(multiple){
            onChange(dateRange)
        }else{
            onChange(dateSingle)
        }
        
    }, [dateRange, dateSingle])

    
    return (
        <div className='flex flex-col relative' ref={calendarRef} tabIndex={-1}>
            <Transition show={calendarVisible}>
                <div className='transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 absolute bg-white border border-neutral-300 p-2 rounded-xl shadow top-[50px] w-[300px] z-40'>
                    <Calendar multiple={multiple} value={date} onChange={chooseDate} />
                </div>
            </Transition>
            <div className='join'>
                <input
                name={name}
                readOnly
                onClick={() => {setCalendarVisible(true)}}
                value={maskedValue}
                placeholder={multiple ? 'DD/MM/YYYY-DD/MM/YYYY' : "DD/MM/YYYY"}
                className={clsx('input w-full join-item', error && "input-error")} />
                {isClearable && <button disabled={disabled} onClick={clear} type='button' className='btn rounded-r-xl'>
                    <TbCircleX className='text-xl text-neutral-500' />
                </button>}
                {showToggle && <button disabled={disabled} type='button' className={clsx('btn rounded-r-full', calendarVisible && "btn-neutral")} onClick={() => {setCalendarVisible(!calendarVisible)}}>
                    <TbCalendarMonth className='text-xl' />
                </button>}
            </div>
            
            
        </div>
    );
}

export default DatePicker;
