import { useRef, useEffect, useState } from "react";
import { MONTH_NAMES, WEEKDAYS } from "../utils/config";

function IllustrateWeeklyCycle({ codeStyle = 'grid', day }) {
    const [requestedDays, setRequestedDays] = useState(day);
    const [showReduced, setShowReduced] = useState(false);
    const [weeklyCycleCode, setWeeklyCycleCode] = useState();

    useEffect(() => {
        let code;
        if (codeStyle === 'table') {
            code = generateCodeTableStyle(day);
        } else {
            code = generateCodeGridStyle(day);
        }
        setWeeklyCycleCode(code);
    }, []);

    useEffect(() => {
        let code;
        if (showReduced) {
            const numberOfDays = requestedDays % 7 || 7;
            if (codeStyle === 'table') {
                code = generateCodeTableStyle(numberOfDays);
            } else {
                code = generateCodeGridStyle(numberOfDays);
            }
        } else {
            if (codeStyle === 'table') {
                code = generateCodeTableStyle(requestedDays);
            } else {
                code = generateCodeGridStyle(requestedDays);
            }
        }
        setWeeklyCycleCode(code);
    }, [showReduced]);

    const toggleDisplay = () => {
        //setShowReduced(!showReduced);
    }


    const illustrationRef = useRef();

    const generateCodeTableStyle = () => {
        const days = [...Array(parseInt(day, 10)).keys()].map(d => d + 1);
        const weeks = [['', '', '', '', '', '', 0]];
        let currentWeek = 0;
        days.forEach((day, counter) => {
            if (counter % 7 === 0) {
                currentWeek = counter / 7 + 1;
                weeks[currentWeek] = [];
            }
            weeks[currentWeek].push(day);
        });
        while (weeks[currentWeek].length % 7 > 0) {
            weeks[currentWeek].push('');
        }
        const thisDay = (day - 1) % 7;
        let code = <table ref={illustrationRef} className="weekly-cycle-table">
            <thead>
                <tr>
                    {WEEKDAYS.map((wd, ndx) => {
                        let classes = 'weekday-label';
                        if (ndx === thisDay) classes += ' matched-day';
                        return <th key={wd} className={classes}>{wd}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {weeks.map((week, key) => {
                    return <tr key={key}>
                        {week.map((day, ndx) => {
                            return <td key={ndx}>{day}</td>
                        })}
                    </tr>
                })}
            </tbody>
        </table>;

        return code;

    }

    const generateCodeGridStyle = (numberOfDays) => {
        const days = [...Array(parseInt(numberOfDays, 10)).keys()].map(d => d + 1);
        const fillerWeek = ['', '', '', '', '', '', 0];
        const thisDay = (numberOfDays - 1) % 7;
        const code = <div onClick={toggleDisplay} ref={illustrationRef} className="weekly-cycle-grid">
            {WEEKDAYS.map((wd, ndx) => {
                let classes = 'weekday-label';
                //if (ndx === thisDay) classes += ' matched-day';
                return <div key={wd} className={classes}>{wd}</div>
            })}
            {fillerWeek.map((day, key) => {
                return day === 0 ? <div key={key}><span>{day}</span></div> : <div key={key}>{day}</div>
            })}
            {days.map((day, key) => {
                return <div key={key}><span>{day}</span></div>
            })}
        </div>

        return code;

    }

    return weeklyCycleCode;

}

export default IllustrateWeeklyCycle;