import React, { Fragment, useEffect, useState } from 'react';
import DayCard from './DayCard';
import { TbChevronRight, TbChevronLeft } from "react-icons/tb";
import { isDateInRange, generateCalendar} from '../../helpers/DateHelper';
import moment from 'moment/moment';

const Calendar = ({value, onChange = (d) => {}, multiple = false, ...props}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [choosingDate, setChoosingDate] = useState(false)
    const [dateRange, setDateRange] = useState([null, null])
    const [dateSingle, setDateSingle] = useState([null, null])
    const [temporaryDate, setTemporaryDate] = useState(null)

    const chooseDate = (date) => {
        if(multiple){
            onChooseDateRange(date)
        }else {
            setDateSingle(date.date)
            onChange(date.date)
        }

    }
    
    const onChooseDateRange = (date) => {
        
        if(!Array.isArray(value)) return false
        const everyDateNull = dateRange.every(d => d === null)
        const dateHasNotNull = dateRange.some(d => d !== null)
        const everyRangeNotNull = dateRange.every(d => d !== null)
        
        if(everyDateNull || everyRangeNotNull){
            const arrDate = [date.date, null]
            setDateRange([...arrDate])
            setChoosingDate(true)
            
        }

        else if(dateHasNotNull){
            const arrDate = [dateRange[0], date.date]
            setDateRange([...arrDate])
            setChoosingDate(false)
            onChange([...arrDate])

        }

    }

    const checkSelected = (date) => {
        if(multiple){
            return checkSelectedRange(date)
        }else{
            return checkSelectedSingle(date)

        }
    }

    const checkSelectedSingle = (date) => {
        return date === dateSingle
    }

    const checkSelectedRange = (date) => {
        const everyDateNull = dateRange.every(d => d === null) 
        if(everyDateNull) return false
        const everyRangeNotNull = dateRange.every(d => d !== null)

        if(everyRangeNotNull){
            return isDateInRange(dateRange[0], dateRange[1], date)
        }
        const dateHasNotNull = dateRange.some(d => d !== null)
        if(dateHasNotNull && temporaryDate != null){
            return isDateInRange(dateRange[0], temporaryDate, date)
        }

        return false
    }

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


    const calendar = generateCalendar(currentMonth);


    const handlePrevMonth = () => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() - 1);
        setCurrentMonth(newMonth);
    };

    const handleNextMonth = () => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + 1);
        setCurrentMonth(newMonth);
    };

    const renderValueRange = () => {
        if(Array.isArray(value) && value.length === 2){
            let everyValDate = value.every(d => d !== null)
            if(everyValDate){
                const endDate = moment(value[1], "DD/MM/YYYY")
                setDateRange([...value])
                setCurrentMonth(new Date(endDate))
                
            }
            if(value.every(v => v) === null){
                setChoosingDate(false)
                setTemporaryDate(null)
                setDateRange([null, null])
            }

        }else {
            setChoosingDate(false)
            setTemporaryDate(null)
            setDateRange([null, null])
        }

    }

    useEffect(() => {
        if(multiple){
            renderValueRange()
        }else{
            setDateRange(value)
        }
    }, [])
    useEffect(() => {

        if(multiple){
            if(Array.isArray(value) && value.length === 2){
                if(value.every(v => v === null)){
                    setChoosingDate(false)
                    setTemporaryDate(null)
                    setDateRange([null, null])
                }
            }else {
                setChoosingDate(false)
                setTemporaryDate(null)
                setDateRange([null, null])
            }
        }else{
            setDateSingle(value)
        }
    }, [value])

    return (
        <div className="w-full" {...props}>
            <div className="flex items-center justify-between gap-4 mb-4">
                <button
                type='button'
                className="btn btn-ghost"
                onClick={handlePrevMonth}  >
                    <TbChevronLeft />
                </button>
                <h2 className="text-lg font-semibold">
                {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                </h2>
                <button
                type='button'
                className="btn btn-ghost"
                onClick={handleNextMonth}><TbChevronRight /></button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
                {daysOfWeek.map((day) => (
                <div key={day} className="font-semibold text-xs">{day}</div>
                ))}

                {calendar.map((week, wIndex) => (
                    <Fragment key={wIndex}>
                        {week.map((day, dIndex) =>  (
                            <DayCard
                            selected={checkSelected(day.date)}
                            onMouseEnter={() => {setTemporaryDate(day.date)}}
                            onMouseLeave={() => {setTemporaryDate(null)}}
                            onClick={(date) => {chooseDate(date)}} 
                            data={day} 
                            key={wIndex-dIndex} />
                        ))}

                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
