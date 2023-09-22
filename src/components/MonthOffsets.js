import { useRef, useEffect, useState } from "react";
import { MONTH_NAMES } from "../utils/config";

function generateCodeTableStyle() {
    return <table className="month-offsets-table">
        <thead>
            <tr><th colSpan="6">Generic Month Offsets</th></tr>
        </thead>
        <tbody>
            <tr>
                <td>January:</td><td>0</td>
                <td>February:</td><td>3</td>
                <td>March:</td><td>3</td>
            </tr>
            <tr>
                <td>April:</td><td>6</td>
                <td>May:</td><td>1</td>
                <td>June:</td><td>4</td>
            </tr>
            <tr>
                <td>July:</td><td>6</td>
                <td>August:</td><td>2</td>
                <td>September:</td><td>5</td>
            </tr>
            <tr>
                <td>October:</td><td>0</td>
                <td>November:</td><td>3</td>
                <td>December:</td><td>5</td>
            </tr>
        </tbody>
    </table>
}

function generateCodeGridStyle() {
    return <>
        <p>Generic month offsets:</p>
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
    </>
}


function MonthOffsets({ codeStyle = 'grid', jan = 0 }) {

    if (codeStyle === 'grid') {
        return generateCodeGridStyle();
    } else {
        return generateCodeTableStyle();
    }

}

export default MonthOffsets;