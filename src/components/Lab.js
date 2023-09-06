import { useEffect, useRef, useState } from 'react';
import { MONTH_OFFSET_TEMPLATE, JULIAN_CENTURY_CONST } from '../utils/config';
import { isLeapYear, generate12DigitCalendarFromYear, generate12DigitCalendarFromOffset } from '../utils/calc';

const STEP_PASS = 'pass';
const STEP_FAIL = 'fail';
const ROUND_COMPLETE = 'complete';
const ROUND_BEGUN = '';
const OPERATOR_DIVISION = '÷';
const OPERATOR_ADDITION = '+';
const OPERATOR_MODULO = '%';


function generateYearTable(year, monthOffsets) {

    const mo = [];
    for (let i = 0; i < 12; i++) {
        if (monthOffsets.length > i) {
            mo.push(monthOffsets.substring(i, i + 1));
        } else {
            mo.push('');
        }
    }
    return <table className="calendar-completion">
        <thead>
            <tr>
                <th colSpan="3">{year}</th>
            </tr>
        </thead>
        <tbody>
            <tr><th>Jan</th><th>Feb</th><th>Mar</th></tr>
            <tr><td>{mo[0]}</td><td>{mo[1]}</td><td>{mo[2]}</td></tr>

            <tr><th>Apr</th><th>May</th><th>Jun</th></tr>
            <tr><td>{mo[3]}</td><td>{mo[4]}</td><td>{mo[5]}</td></tr>

            <tr><th>Jul</th><th>Aug</th><th>Sep</th></tr>
            <tr><td>{mo[6]}</td><td>{mo[7]}</td><td>{mo[8]}</td></tr>

            <tr><th>Oct</th><th>Nov</th><th>Dec</th></tr>
            <tr><td>{mo[9]}</td><td>{mo[10]}</td><td>{mo[11]}</td></tr>
        </tbody>
    </table>

}

function Lab() {
    const answerRef = useRef();
    const janMarRef = useRef();
    const yearOffsetRef = useRef();
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
    const [mOffsets, setMOffsets] = useState('');
    const [answerKey, setAnswerKey] = useState('');

    useEffect(() => {
        getRandomYear()
    }, []);

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

    useEffect(() => {
        if (roundStatus === ROUND_BEGUN) {
            resetRefs();
        }
    }, [roundStatus]);

    const calcTwoDigitYear = y => y % 100;

    function resetRefs() {
        answerRef.current.classList.add('hide-answer');
        janMarRef.current.value = '';
    }

    function reset() {
        setRoundStatus(ROUND_BEGUN);
        setCurrentStep(0);
        setStepStatus('')
        setIsLeap(false);
        setLeapDays(0);
        setRawYearOffset(0);
        setMod7YearOffset(0);
        setCenturyOffset(0);
        setYearOffset(0);
        setMOffsets('');
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
        setMOffsets(value);
    }

    const skipSteps = e => {
        const janOffset = answerKey.substring(0, 1);
        const febOffset = answerKey.substring(1, 2);
        const marOffset = answerKey.substring(2, 3);
        const valToCheck = janMarRef.current.value;
        const [jan, feb, mar] = valToCheck.split('');
        console.log('====> Skipping? jan, feb, mar', jan, feb, mar);
        if (jan === janOffset && feb === febOffset && mar === marOffset) {
            setRoundStatus(ROUND_COMPLETE);
            setMOffsets(answerKey);
            answerRef.current.classList.remove('hide-answer');
        }
    }

    function showStep(step) {
        const stepCode = [];
        if (step >= 0) {
            stepCode.push(<section key={0} className="grid-container">
                <div><div className="step-number">Step 1</div></div>
                <div>
                    {step === 0 ? `Is ${year} a leap year?` : (isLeap ? 'Leap year' : 'Non-leap year')}
                </div>
                {step === 0 && (<>
                    <div></div>
                    <div>
                        <button onClick={handleBtnLeapYear}>Leap year</button> <button onClick={handleBtnNotLeapYear}>Non-leap year</button>
                    </div>
                </>)}

            </section >);
        }

        if (step >= 1) {
            stepCode.push(<section key={1} className="grid-container">
                <div><div className="step-number">Step 2</div></div>
                <div>
                    {step === 1 ? `Find the number of leap days.`
                        : `Leap days: ${leapDays}`}
                </div>
                {step === 1 && (<>
                    <div></div>
                    <div className="calculation">
                        <div className="large-number">{twoDigitYear}</div>
                        <div className="arithmetic-op">{OPERATOR_DIVISION}</div>
                        <div className="large-number">4</div>
                        <input id="leap-days" type="number" pattern="\d*" ref={leapDaysRef} onChange={handleLeapDays} style={{ width: '50px' }} />
                    </div>
                </>)}
            </section>);
        }

        if (step >= 2) {
            stepCode.push(<section key={2} className="grid-container">
                <div><div className="step-number">Step 3</div></div>
                <div>
                    {step === 2 ? `Find the year offset.`
                        : `Year offset: ${rawYearOffset}`}
                </div>
                {step === 2 && (<>
                    <div></div>
                    <div className="calculation">
                        <div className="large-number">{twoDigitYear}</div>
                        <div className="arithmetic-op">{OPERATOR_ADDITION}</div>
                        <div className="large-number">{leapDays}</div>
                        <input ref={yearOffsetRef} id="raw-year-offset" type="number" pattern="\d*" onChange={handleRawYearOffset} style={{ width: '50px' }} />
                    </div>
                </>)}
            </section>);
        }

        if (step >= 3) {
            stepCode.push(<section key={3} className="grid-container">
                <div><div className="step-number">Step 4</div></div>
                <div>
                    {step === 3 ? `Reduce the Year Offset.`
                        : `${rawYearOffset} % 7 = ${mod7YearOffset}`}
                </div>
                {step === 3 && (<>
                    <div></div>
                    <div className="calculation">
                        <div className="large-number">{rawYearOffset}</div>
                        <div className="arithmetic-op">{OPERATOR_MODULO}</div>
                        <div className="large-number">7</div>
                        <input id="year-offset" type="number" pattern="\d*" onChange={handleMod7YearOffset} style={{ width: '50px' }} />
                    </div>
                </>)}
            </section>);
        }

        if (step >= 4) {
            stepCode.push(<section key={4} className="grid-container">
                <div><div className="step-number">Step 5</div></div>
                <div>Complete the 12-digit Calendar </div>
                <div></div>
                <div className="align-top">
                    <input id="calendar-input" type="number" pattern="\d*" onChange={handleCalendarInput} style={{ width: '200px' }} />
                </div>

            </section>);
        }

        return stepCode;
    }

    return (<div className="calendar-lab">
        <h3>Generate the calendar for {year}.</h3>

        <hr />

        <div>{roundStatus === ROUND_COMPLETE && generateYearTable(year, mOffsets)}</div>

        {roundStatus !== ROUND_COMPLETE && <>
            <p>Skip steps? Enter the offsets for January, February, and March.</p>
            <div style={{ display: 'flex' }}>
                <div><input ref={janMarRef} type="number" pattern="\d+" style={{ width: '50px' }} /> <button onClick={skipSteps}>Skip Steps</button></div>

                <div style={{ display: 'none' }}>
                    <p ref={answerRef} className="hide-answer"><strong>ANSWER</strong>: {answerKey}</p>
                </div>
            </div>
        </>}
        <hr />

        {roundStatus !== ROUND_COMPLETE && (<>{showStep(currentStep).map(step => step)}<hr /></>)
        }

        {year < 2000 || year > 2099 ? <>
            <div>Century Offset</div>
            <input type="text" ref={centuryOffsetRef} onChange={handleCenturyOffset} />
        </> : null}



        <div><button onClick={getRandomYear}>Refresh Year</button></div>
    </div>)
}

export default Lab;