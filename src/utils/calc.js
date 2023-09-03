import { JULIAN_CENTURY_CONST, MONTH_OFFSET_TEMPLATE } from "./config";

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