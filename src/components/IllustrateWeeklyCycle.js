import { useRef } from "react";
import { MONTH_NAMES, WEEKDAYS } from "../utils/config";

function IllustrateWeeklyCycle({ day }) {
    const illustrationRef = useRef();

    const reduceCycles = () => {
        let finalNodeNdx;
        illustrationRef.current.childNodes.forEach((element, ndx) => {
            if (ndx < 7) return;
            if (ndx - 7 > thisDay) element.classList.add('fade');
            finalNodeNdx = ndx;
        });
        illustrationRef.current.childNodes[finalNodeNdx].addEventListener('transitionend', fadeFinished);

        function fadeFinished() {
            console.log('====> fade finished');
            while (illustrationRef.current.childNodes.length > 14) {
                illustrationRef.current.childNodes[14].remove();
            }

        }
    }

    const days = [...Array(parseInt(day, 10)).keys()].map(d => d + 1);
    const thisDay = (day - 1) % 7;
    const code = <div onClick={reduceCycles} ref={illustrationRef} className="weekly-cycle-grid">
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

export default IllustrateWeeklyCycle;