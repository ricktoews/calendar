import { WEEKDAYS, JULIAN_CENTURY_CONST, MONTH_OFFSET_TEMPLATE } from "./config";

export const isLeapYear = (year) => {
    let isLeap = false;
    if (year % 400 === 0) {
        isLeap = true;
    } else if (year % 4 === 0 && year < 1600) {
        // Julian calendar
        isLeap = true;
    } else if (year % 4 === 0 && year % 100 !== 0) {
        // Gregorian calendar
        isLeap = true;
    }

    return isLeap;
}
export const calcYearConfig = (year) => {
    const isJulian = year < 1583;
    const isLeap = isLeapYear(year);

    let centuryBase = Math.floor(year / 100);
    let offsetYear = year % 100;
    const centuryOffset = isJulian ? JULIAN_CENTURY_CONST - centuryBase : centuryBase % 4 * 5;
    const leapDays = Math.floor(offsetYear / 4);
    const jan = (centuryOffset + offsetYear + leapDays) % 7;
    return { jan, isLeap, year };
}

const calcMonthDigit = (jan, isLeap, monthNdx, year) => {
    const leapAdjust = isLeap && monthNdx < 2 ? 6 : 0;
    let gregorian1582Adjust = 0;
    if (year === 1582) {
        if (monthNdx >= 10) {
            gregorian1582Adjust = 4;
        }
    }
    const monthDigit = (jan + MONTH_OFFSET_TEMPLATE[monthNdx] + leapAdjust + gregorian1582Adjust) % 7;
    return monthDigit;
}

export const generateYear = ({ jan, isLeap, year }) => {
    const monthDigits = [];
    for (let i = 0; i < 12; i++) {
        const monthDigit = calcMonthDigit(jan, isLeap, i, year);
        monthDigits.push(monthDigit);
    }
    return monthDigits;
}

export const generate12DigitCalendarFromYear = (year) => {
    const calendar12DigitArr = generateYear(calcYearConfig(year));
    const calendar12Digit = calendar12DigitArr.join('');
    return calendar12Digit;
}

export const generate12DigitCalendarFromOffset = (yearOffset, isLeap) => {
    const monthDigits = [];
    for (let i = 0; i < 12; i++) {
        const monthDigit = calcMonthDigit(yearOffset, isLeap, i, -1);
        monthDigits.push(monthDigit);
    }
    const calendar12Digit = monthDigits.join('');
    return calendar12Digit;
}


// DON'T CURRENTLY USE, BUT SURE: KEEP THE CODE.
const showDayInWeeklyCycle = (day) => {
    const days = [...Array(day).keys()].map(d => d + 1);
    const thisDay = (day - 1) % 7;
    const code = <div className="weekly-cycle-grid">
        {WEEKDAYS.map((wd, ndx) => {
            let classes = 'weekday-label';
            if (ndx === thisDay) classes += ' matched-day';
            return <div key={wd} className={classes}>{wd}</div>
        })}
        {days.map((day, key) => {
            return <div key={key}><span>{day}</span></div>
        })}
    </div>
    return code;
}

const illustrateLeapYears = (year) => {
    const centuryYear = Math.floor(year / 100) * 100;
    const years = [];
    for (let y = centuryYear + 1; y <= year; y++) { years.push(y); }
    const code = <div className="leap-year-illustration">
        {years.map((y, key) => {
            return <div data-ndx={(key + 1) / 4} key={key}>{y}</div>
        })}
    </div>
    return code;
}

