function validateDate(date) {
    // Regular expression to match the format dd/mm/yyyy
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    
    // Check if the date matches the regex
    if (!regex.test(date)) {
        return false;
    }

    // Split the date into day, month, and year
    const [day, month, year] = date.split('/').map(Number);

    // Create a new Date object
    const dateObj = new Date(year, month - 1, day);

    // Check if the created date matches the input date (to handle invalid dates like 31/02/2025)
    return dateObj.getDate() === day && dateObj.getMonth() === month - 1 && dateObj.getFullYear() === year;
}

function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
}
  
function isDateInRange(startDate, endDate, date) {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    const target = parseDate(date);

    const minDate = new Date(Math.min(start, end));
    const maxDate = new Date(Math.max(start, end));

    return target >= minDate && target <= maxDate;
}

const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay();
};

const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const generateCalendar = (date) => {
    const firstDay = getFirstDayOfMonth(date); // 0 = Sunday, 6 = Saturday
    const daysInMonth = getDaysInMonth(date);
    const calendar = [];

    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    // Get days in previous month
    const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
    const daysInPrevMonth = getDaysInMonth(prevMonthDate);

    let dayCounter = 1;
    let nextMonthDayCounter = 1;

    for (let week = 0; week < 6; week++) {
        const arrWeek = [];

        for (let dayInWeek = 0; dayInWeek < 7; dayInWeek++) {
            let dayObj = {};

            const cellIndex = week * 7 + dayInWeek;

            if (cellIndex < firstDay) {
                // Previous month
                const day = daysInPrevMonth - (firstDay - cellIndex - 1);
                const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
                dayObj = {
                    date: `${day}/${prevMonth + 1}/${prevYear}`,
                    display: day,
                    isOtherMonth: true
                };
            } else if (dayCounter <= daysInMonth) {
                // Current month
                dayObj = {
                    date: `${dayCounter}/${currentMonth + 1}/${currentYear}`,
                    display: dayCounter,
                    isOtherMonth: false
                };
                dayCounter++;
            } else {
                // Next month
                const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
                const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
                dayObj = {
                    date: `${nextMonthDayCounter}/${nextMonth + 1}/${nextYear}`,
                    display: nextMonthDayCounter,
                    isOtherMonth: true
                };
                nextMonthDayCounter++;
            }

            arrWeek.push(dayObj);
        }

        calendar.push(arrWeek);
    }

    return calendar.filter(week => !week.every(day => day.isOtherMonth));
};

export {
    parseDate,
    isDateInRange,
    getFirstDayOfMonth,
    getDaysInMonth,
    generateCalendar,
    validateDate
}