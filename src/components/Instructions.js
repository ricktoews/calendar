import { calc12DigitYear } from "./calendar-helper";
import { MONTH_NAMES, WEEKDAYS } from "../utils/config";

const generateMonthDates = (offset, days) => {
    const monthDates = [];
    for (let i = 0; i < offset; i++) {
        monthDates.push('');
    }
    for (let i = 0; i < days; i++) {
        monthDates.push(i + 1);
    }
    while (monthDates.length % 7 > 0) {
        monthDates.push('');
    }
    return monthDates;
}


const generateMonthOffsetOverlay = (offset) => {
    const overlayWidth = offset * 50;
    const style = {
        position: 'absolute',
        zIndex: 10,
        width: `${overlayWidth}px`,
        height: '45px',
        background: 'rgba(128,128,128, .4)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const code = <div style={style} className="offset-overlay">Month Offset</div>;
    return code;
}
const illustrateMonth = (monthNdx, year) => {
    const monthHeading = MONTH_NAMES[monthNdx] + ' ' + year;
    const monthOffsets = calc12DigitYear(year);
    const monthOffset = monthOffsets[monthNdx];
    const Jan2025 = generateMonthDates(monthOffset, 31);
    const offsetOverlay = generateMonthOffsetOverlay(monthOffset);
    let isMonthOffset = true;
    const code = <div className="month-grid">
        <div className="month-heading">{monthHeading}</div>
        {WEEKDAYS.map(wd => <div key={wd} className="weekday-label">{wd}</div>)}
        {Jan2025.map((md, key) => {
            if (md) isMonthOffset = false;
            if (isMonthOffset && key === 0) return <div key={key} className="month-offset">{offsetOverlay}{md}</div>
            else if (isMonthOffset) return <div key={key} className="month-offset">{md}</div>
            return <div key={key}>{md}</div>
        })}
    </div>
    return code;
}

function Instructions() {
    return (<div>
        <h1>The 12-Digit Calendar</h1>

        <h2>Introduction</h2>

        <p>The concept of the 12-digit calendar is simple. Suppose you want to know what day of the week New Year's day, 2025 falls on. All you need to do is add the date to the "month offset." The sum is the position of the day within the weekly cycle, with Sunday being the first day of the week.</p>

        <p>The month offset is a number in the range of 0 to 6. For January 2025, the month offset is 3. To find the day of the week for January 1, 2025, add 1 to 3, for a sum of 4. So January 1, 2025 is on the 4th day of the week, or Wednesday.</p>

        <p>Now, suppose you wanted July 4, 2023. The month offset for July 2023 is 6. The sum of 6 and 4 is 10. What's the 10th day of the week? If the first day is Sunday and the seventh day is Saturday, what's the eighth day? It's back to Sunday. So the ninth day is Monday, and the 10th day is Tuesday. </p>

        <p>Notice that the 10th day is the same as the third day. This is because every seven days, the weekly cycle starts over. It doesn't matter how many weekly cycles there are in your sum: all that matters is the number of days into the weekly cycle a day is. So the 10th day is the same as the 3rd day, because 10 divided by 7 leaves a remainder of 3.</p>

        <p>Often, when you add the date to the month offset, you'll get a number that's greater than 7. All you need to do is divide the number by 7 and take the remainder. The remainder is the day of the week. So the 22nd day is the same as the 1st day, the 47th day is the same as the 5th day, the 56th day is the same as the 7th day, and so on.</p>

        <p>Yes, you will want to be comfortable with the 7s in the multiplcation table so you can easily find remainders. Incidentally, the word for the remainder, divided by some number is "modulo." For example, 10 modulo 7 is 3. We'll be using that word a lot.</p>


        <h2>The Month Offset</h2>

        {illustrateMonth(0, 2025)}

        <p>If you've looked at a standard month calendar, you've noticed that different months start on different days of the week and that most have a certain number of empty spaces before the first day. For example, January of 2025 starts on a Wendesday, so the spaces under Sunday, Monday, and Tuesday are blank. The number of blank spaces is the "month offset." For January, 2025, there are three blank spaces before the first day of the month, so the month offset is 3.</p>



    </div>)
}

export default Instructions;