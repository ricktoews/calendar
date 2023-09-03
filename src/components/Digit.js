function Digit({ digit, digitCallback }) {

    const handleDigit = e => {
        if (digitCallback) {
            e.stopPropagation();
            digitCallback(digit);
        }
    }

    return (<div className="digit" onClick={handleDigit}>
        {digit}
    </div>)
}

export default Digit;