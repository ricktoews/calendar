import { useEffect, useState } from "react";
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

function Instructions() {
    const [dayInWeeklyCycle, setDayInWeeklyCycle] = useState(30);
    const [weeklyCycle, setWeeklyCycle] = useState(null);

    useEffect(() => {
        setWeeklyCycle(showDayInWeeklyCycle(30));
    }, []);

    const reduceDayInWeeklyCycle = (e) => {
        console.log('====> set cycle for day', dayInWeeklyCycle);
        if (dayInWeeklyCycle > 7) {
            const code = showDayInWeeklyCycle(dayInWeeklyCycle - 7);
            setWeeklyCycle(code);
            setDayInWeeklyCycle(dayInWeeklyCycle - 7);
        }
    }

    const resetDayInWeeklyCycle = (e) => {
        const { days } = e.currentTarget.dataset;
        console.log('====> resetDayInWeeklyCycle', days);
        setDayInWeeklyCycle(days);
        const code = showDayInWeeklyCycle();
        setWeeklyCycle(code);
    }


    return (<div>

        <h1>The 12-Digit Calendar</h1>

        <h2>Introduction</h2>

        <p>The concept of the 12-digit calendar is simple. Suppose you want to know what day of the week New Year's day, 2025 falls on. All you need to do is add the <em>date</em> to the <em>month offset</em>. The sum is the position of the day within the weekly cycle, with Sunday being the first day of the week. The month offset for January 2025 is 3.</p>

        <p>So, January 1, 2025: <em>date</em> (1) + <em>month offset</em> (3) = day within weekly cycle (4):</p>

        <div>{showDayInWeeklyCycle(4)}</div>

        <p>So January 1, 2025 is a Wednesday. Here's a calendary for January, 2025:</p>

        {illustrateMonth(0, 2025)}

        <p>Notice that Sunday, Monday, and Tuesday are blank for the first row, so that January 2025 begins on Wednesday. The number of blank days is the <em>month offset</em>.</p>

        <p>Let's look at another example. How about December 25, 2023. In this case, the month offset is 5. So 25 + 5 = 30. The 30th day in the weekly cycle is Monday:</p>

        <div>{showDayInWeeklyCycle(30)}</div>

        <p>Here's the calendar for December 2023:</p>

        {illustrateMonth(11, 2023)}

        <p>Of course, we don't really count out 30 days to reach Monday. Let's look at the cycles again.</p>

        <div>{showDayInWeeklyCycle(30)}</div>

        <p>Notice that there are four complete rows of weekly cycles before the last one, but that the last one is really all you need. To get that, you just divide the 30 by 7 and take the remainder. This leaves you with 2:</p>

        <div>{showDayInWeeklyCycle(30 % 7)}</div>

        <h2>The Month Offset</h2>

        <p>So the question is, when we want the day of the week for a date, how do we get the month offset?</p>

        <p>The process is fairly straightforward. There are a couple of pieces of information you need: The <em>generic month offset</em>, and the <em>year offset</em>. As with the sum of the month offset and the date, these numbers all correspond to a position in the weekly cycle. This means that if a number you're working with is greater than 7, you can simply divide by 7 and take the remainder, as illustrated above.</p>

        <p>You can calculate the year offset, but you will simply need to learn the generic month offsets.</p>

        <h3>Generic Month Offsets</h3>
        <div className="month-offsets">
            <div>January: 0</div>
            <div>February: 3</div>
            <div>March: 3</div>
            <div>April: 6</div>
            <div>May: 1</div>
            <div>June: 4</div>
            <div>July: 6</div>
            <div>August: 2</div>
            <div>September: 5</div>
            <div>October: 0</div>
            <div>November: 3</div>
            <div>December: 5</div>
        </div>

        <h3>Year Offsets</h3>

        <p>To get the year offset, use the two-digit year. Divide the year by 4 (ignore any remainder), and add the result to the year. For example, for 2025, divide 25 by 4, giving you 6, and add that to 25. So the year offset for 2025 is 31. But since 31 divided by 7 leaves a remainder of 3, the year offset for 2025 is 3.</p>

        <h3>Month Offset</h3>

        <p>The month offset is the sum of the <em>generic month offset</em> and the <em>year offset</em>.</p>

    </div>)
}

export default Instructions;