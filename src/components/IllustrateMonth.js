import { useRef, useState } from "react";
import { calc12DigitYear, isLeap } from "./calendar-helper";
import { MONTH_DAYS, MONTH_NAMES, WEEKDAYS } from "../utils/config";

const generateMonthRows = (offset, days) => {
    const rows = [[]];
    let currentRow = 0;
    for (let i = 0; i < offset; i++) {
        rows[currentRow].push('');
    }
    for (let i = 0; i < days; i++) {
        if (rows[currentRow].length >= 7) {
            currentRow++;
            rows[currentRow] = [];
        }
        rows[currentRow].push(i + 1);
    }
    while (rows[currentRow].length % 7 > 0) {
        rows[currentRow].push('');
    }
    return rows;
}

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
        width: `${overlayWidth}px`,
    }
    const code = <div style={style} className="offset-overlay">Month Offset</div>;
    return code;
}


function IllustrateMonth({ codeStyle = 'grid', monthNdx, year, weekly = false }) {
    const monthRef = useRef();
    const [whichGrid, setWhichGrid] = useState('month');
    const [selectedDateState, setSelectedDateState] = useState([]);
    const [selectedWeekday, setSelectedWeekday] = useState('');
    const monthHeading = MONTH_NAMES[monthNdx] + ' ' + year;
    const monthOffsets = calc12DigitYear(year);
    const monthOffset = monthOffsets[monthNdx];
    const leapDay = isLeap(year) ? 1 : 0;
    const monthDates = generateMonthDates(monthOffset, MONTH_DAYS[monthNdx] + leapDay);
    const monthRows = generateMonthRows(monthOffset, MONTH_DAYS[monthNdx] + leapDay);
    const offsetOverlay = generateMonthOffsetOverlay(monthOffset);
    let isMonthOffset = true;

    const toggleMonthWeeklyCycle = () => {
        if (whichGrid === 'month') {
            setWhichGrid('weeks');
            monthRef.current.classList.add('weekly-cycles');
        } else {
            setWhichGrid('month');
            monthRef.current.classList.remove('weekly-cycles');
        }
    }

    const selectDate = (e) => {
        const el = e.currentTarget;
        const { ndx } = el.dataset;
        const weekdayNdx = (ndx - 1) % 7;
        //        console.log('====> weekday', weekdayNdx, WEEKDAYS[weekdayNdx]);
        const date = el.textContent;
        const tmp = selectedDateState;
        Object.keys(tmp).forEach(item => {
            if (item !== date) {
                if (tmp[item]) tmp[item].classList.remove('selected-date');
                tmp[item] = false;
            }
        });
        if (!tmp[date]) {
            tmp[date] = el;
            el.classList.add('selected-date');
            setSelectedWeekday(WEEKDAYS[weekdayNdx]);
        } else {
            tmp[date] = false;
            el.classList.remove('selected-date');
            setSelectedWeekday('');
        }
        setSelectedDateState(tmp);
    }

    const illustrateMonthTableStyle = () => {
        const code = <table ref={monthRef} className="month-table">
            <thead>
                <tr>
                    <th colSpan="7" className="month-heading">{monthHeading}</th>
                </tr>
                <tr>
                    {WEEKDAYS.map(wd => {
                        const classes = ['weekday-label'];
                        if (wd === selectedWeekday) classes.push('selected-weekday');
                        return <th key={wd} className={classes.join(' ')}>{wd}</th>
                    })}

                </tr>
            </thead>

            <tbody>
                {monthRows.map((row, rowNdx) => {
                    return <tr key={rowNdx}>
                        {row.map((md, key) => {
                            const day = key + 1;
                            if (md) isMonthOffset = false;
                            else if (isMonthOffset) return <td key={key} data-ndx={day} className="month-offset">{md}</td>
                            return <td key={key} data-ndx={day} onClick={selectDate}>{md}</td>
                        })}
                    </tr>
                })}
            </tbody>
        </table>
        return code;
    }

    const illustrateMonthGridStyle = () => {
        const code = <div className="calendar-lab"><div ref={monthRef} className="month-grid">

            {whichGrid === 'month' ? <div className="month-heading">{monthHeading}</div>
                : <div className="month-heading">Weekly Cycles</div>}

            {WEEKDAYS.map(wd => {
                const classes = ['weekday-label'];
                if (wd === selectedWeekday) classes.push('selected-weekday');
                return <div key={wd} className={classes.join(' ')}>{wd}</div>
            })}

            {monthDates.map((md, key) => {
                const day = key + 1;
                if (md) isMonthOffset = false;
                if (isMonthOffset && key === 0) return <div key={key} data-ndx={day} className="month-offset">{offsetOverlay}{md}</div>
                else if (isMonthOffset) return <div key={key} data-ndx={day} className="month-offset">{md}</div>
                return <div key={key} data-ndx={day} onClick={selectDate}>{md}</div>
            })}
        </div>
            {weekly && <div className="button-wrapper">
                {whichGrid === 'month' ? <button onClick={toggleMonthWeeklyCycle}>Show Weekly Cycle</button>
                    : <button onClick={toggleMonthWeeklyCycle}>Show Month</button>}

            </div>}
        </div>
        return code;

    }

    if (codeStyle === 'table') {
        return illustrateMonthTableStyle();
    } else {
        return illustrateMonthGridStyle();
    }
}

export default IllustrateMonth;