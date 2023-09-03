import { useEffect, useRef, useState } from 'react';
import { MONTH_OFFSET_TEMPLATE, JULIAN_CENTURY_CONST } from '../utils/config';
import { isLeapYear, generate12DigitCalendarFromYear, generate12DigitCalendarFromOffset } from '../utils/calc';
import Digit from './Digit';

const STEP_PASS = 'pass';
const STEP_FAIL = 'fail';
const ROUND_COMPLETE = 'complete';
const ROUND_BEGUN = '';

function Lab() {
    const twoDigitYearRef = useRef();
    const leapDaysRef = useRef();
    const centuryOffsetRef = useRef();

    const [year, setYear] = useState(0);
    const [twoDigitYear, setTwoDigitYear] = useState(0);
    const [roundStatus, setRoundStatus] = useState('');
    const [currentStep, setCurrentStep] = useState(0);
    const [stepStatus, setStepStatus] = useState('');
    const [isLeap, setIsLeap] = useState(false);
    const [leapDays, setLeapDays] = useState(0);
    const [rawYearOffset, setRawYearOffset] = useState(0);
    const [mod7YearOffset, setMod7YearOffset] = useState(0);
    const [centuryOffset, setCenturyOffset] = useState(0);
    const [yearOffset, setYearOffset] = useState(0);
    const [calendarCompletion, setCalendarCompletion] = useState('');
    const [answerKey, setAnswerKey] = useState('');

    useEffect(() => {
        getRandomYear()
    }, []);

    const calcTwoDigitYear = y => y % 100;

    function reset() {
        setRoundStatus(ROUND_BEGUN);
        setCurrentStep(0);
        setStepStatus('')
        setIsLeap(false);
        setLeapDays(0);
        setRawYearOffset(0);
        setMod7YearOffset(0);
        setCenturyOffset(0);
        setYearOffset(0)
        setCalendarCompletion('');
        setAnswerKey('');
    }

    function getRandomYear() {
        // Reset everything
        reset();

        // Actually get random year.
        const randomYear = Math.floor(Math.random() * 100) + 2000;
        setYear(randomYear);
        setTwoDigitYear(calcTwoDigitYear(randomYear));
        const cal = generate12DigitCalendarFromYear(randomYear);
        setAnswerKey(generate12DigitCalendarFromYear(randomYear));
    }

    function calcYearOffset(twoDigitYear, isLeap, leapDays, centuryOffset) {
        let result = (twoDigitYear + leapDays + centuryOffset) % 7;
        setYearOffset(result);
        return result;
    }


    const toInt = x => parseInt(x, 10);

    // Leap Year Buttons
    const handleBtnLeapYear = e => {
        setIsLeap(true);
        const status = isLeapYear(year) ? STEP_PASS : STEP_FAIL;
        setStepStatus(status);
    }

    const handleBtnNotLeapYear = e => {
        setIsLeap(false);
        const status = isLeapYear(year) === false ? STEP_PASS : STEP_FAIL;
        setStepStatus(status);
    }
    // End Leap Year Buttons

    const handleLeapDays = e => {
        const value = toInt(e.currentTarget.value)
        const targetValue = Math.floor(twoDigitYear / 4);
        setLeapDays(value);
        const status = value === targetValue ? STEP_PASS : STEP_FAIL;
        setStepStatus(status);
    }

    const handleRawYearOffset = e => {
        const value = toInt(e.currentTarget.value);
        const targetValue = leapDays + twoDigitYear;
        setRawYearOffset(value);
        const status = value === targetValue ? STEP_PASS : STEP_FAIL;
        setStepStatus(status);
    }

    const handleMod7YearOffset = e => {
        const value = toInt(e.currentTarget.value);
        const targetValue = (leapDays + twoDigitYear) % 7;
        const status = value === targetValue ? STEP_PASS : STEP_FAIL;
        setMod7YearOffset(value);
        setStepStatus(status);
    }

    const handleCenturyOffset = e => {
        setCenturyOffset(toInt(e.currentTarget.value));
    }

    const handleCalendarInput = e => {
        if (e.currentTarget.value === '') return;

        const value = e.currentTarget.value;
        if (value === answerKey) {
            setRoundStatus(ROUND_COMPLETE);
        }
        setCalendarCompletion(value);
    }
    /*
        const handleDigitClick = (d) => {
            console.log('====> Clicked', d);
            const value = calendarCompletion + d;
            console.log(`====> handleDigitClick ${value}, ${answerKey}`);
            if (value === answerKey) {
                setRoundStatus(ROUND_COMPLETE);
            }
            setCalendarCompletion(calendarCompletion + d);
        }
    
        const digitClickUndo = e => {
            e.stopPropagation();
            const digits = calendarCompletion.split('');
            digits.pop();
            setCalendarCompletion(digits.join(''));
        }
    */
    useEffect(() => {
        calcYearOffset(twoDigitYear, isLeap, leapDays, centuryOffset);
    }, [twoDigitYear, isLeap, leapDays, centuryOffset]);

    useEffect(() => {
        //        console.log(`====> Step ${currentStep}, status ${stepStatus}`);
        if (stepStatus === STEP_PASS) {
            setCurrentStep(currentStep + 1);
            setStepStatus('');
        }
    }, [stepStatus]);

    function showStep(step) {
        let stepCode = '';
        switch (step) {
            case 0:
                stepCode = <section>First, Is it a leap year? <button onClick={handleBtnLeapYear}>Leap year</button> <button onClick={handleBtnNotLeapYear}>Not leap year</button></section>
                break;

            case 1:
                stepCode = <section>Second, What is the two-digit year divided by 4, ignoring any remainder? <input id="leap-days" type="number" pattern="\d*" ref={leapDaysRef} onChange={handleLeapDays} style={{ width: '50px' }} /></section>
                break;

            case 2:
                stepCode = <section>Third, What is the sum of the two-digit year and the the year divided by 4? <input id="raw-year-offset" type="number" pattern="\d*" onChange={handleRawYearOffset} style={{ width: '50px' }} /></section>
                break;

            case 3:
                stepCode = <section>Fourth, What is the above sum, modulo 7? <input id="year-offset" type="number" pattern="\d*" onChange={handleMod7YearOffset} style={{ width: '50px' }} /></section>
                break;

            case 4:
                stepCode = <section>Finally, Complete the 12-digit Calendar<input id="calendar-input" type="number" pattern="\d*" onChange={handleCalendarInput} style={{ width: '200px' }} /></section>
                break;

            case 5:
            case 6:
            default:
                break;
        }

        return stepCode;
    }

    return (<div>
        <h3>Generate the calendar for {year}.</h3>
        {currentStep > 0 ? <p>Progress: Leap year {isLeap}, Leap days {leapDays} Year offset {mod7YearOffset}</p> : null}
        <p>Calendar completion: <strong>{calendarCompletion}</strong></p>
        <hr />

        {showStep(currentStep)}

        <hr />
        <div style={{ display: 'none' }}>
            {/*
            <div className="digit-pad">
                {[0, 1, 2, 3, 4, 5, 6].map((item, key) =>
                    <Digit key={key} digitCallback={handleDigitClick} digit={item}></Digit>)}
                <button onClick={digitClickUndo}>Undo</button>
            </div>
*/}
            <hr />
        </div>

        <div style={{ display: 'none' }}>{generate12DigitCalendarFromOffset(yearOffset, isLeap)}</div>

        {roundStatus === ROUND_COMPLETE ?
            <p>You did it!</p> : null}

        <p><strong>ANSWER KEY</strong>: {answerKey}</p>


        {year < 2000 || year > 2099 ? <>
            <div>Century Offset</div>
            <input type="text" ref={centuryOffsetRef} onChange={handleCenturyOffset} />
        </> : null}



        <div><button onClick={getRandomYear}>Refresh Year</button></div>
    </div>)
}

export default Lab;