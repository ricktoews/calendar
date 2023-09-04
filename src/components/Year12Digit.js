import { generateYear, calcYearConfig } from "../utils/calc";

function Year12Digit(props) {
    const { year, isCurrentYear } = props;
    const handleClick = e => {
        if (props.onClick) {
            props.onClick(e);
        }
    }

    const monthDigits = generateYear(calcYearConfig(year));
    const janDigit = monthDigits[0];
    const isLeap = monthDigits[1] !== monthDigits[2];
    const classNames = ['year-12-digit-wrapper']
    if (isCurrentYear) {
        classNames.push('current-year')
    } else if (year === 1582) {
        classNames.push('weird-year');
    }
    return (<div onClick={props.onClick} className={classNames.join(' ')}>
        <div className="digit-grid">
            <div data-year={year} data-jan={janDigit} data-leap={isLeap} className="year-label">{year}</div>
            {monthDigits.map((digit, ndx) => <div key={ndx}>{digit}</div>)}
        </div>
    </div>)
}

export default Year12Digit;