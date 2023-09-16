import { useEffect, useState } from "react";
import { calc12DigitYear, isLeap } from "./calendar-helper";
import { MONTH_DAYS, MONTH_NAMES, WEEKDAYS } from "../utils/config";
import IllustrateWeeklyCycle from "./IllustrateWeeklyCycle";
import IllustrateMonth from "./IllustrateMonth";

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

const illustrateLeapYears = (year) => {
    const centuryYear = Math.floor(year / 100) * 100;
    const years = [];
    for (let y = centuryYear + 1; y <= year; y++) { years.push(y); }
    const code = <div className="leap-year-illustration">
        {years.map((y, key) => {
            return <div data-ndx={(key + 1) / 4} key={key}>{y}</div>
        })}
    </div>
    return code;
}

function Instructions() {

    return (<div>

        <h1>Calculate Day of Week</h1>

        <h2>tl;dr</h2>

        <p>(year offset + month pattern offset + date + century offset) modulo 7</p>

        <p><em>Or, if for January or February in a leap year:</em></p>

        <p>(above - 1) modulo 7</p>

        <h2>Introduction</h2>

        <p>It really just comes down to the position of a day within the weekly cycle. Day 1 is Sunday, day 2 is Monday, and so on.</p>

        <p>When the position of the day is more than 7, you can just divide by 7 and use the remainder. For example, the 8th day is the same as the 1st day.</p>

        <IllustrateWeeklyCycle day="8"></IllustrateWeeklyCycle>

        <p>To get the position of the day from the date, you need the <em>month offset</em>.</p>

        <h2>Month Offset</h2>

        <p>The <em>month offset</em> is just the number of placeholders in the week before the first day of the month. You've seen this many times on a conventional calendar. Here, for example, is the calendar for September, 2023, which has a <em>month offset</em> of 5 days:</p>

        <IllustrateMonth monthNdx="8" year="2023"></IllustrateMonth>

        <p>To determine the day of the week, you just add the <em>month offset</em> to the date. So the day of the week for September 1 is 5 + 1 = 6--the 6th day of the week: Friday.</p>

        <p>All month offsets are in the range of 0 to 6. The offset of any given month is just the offset of the previous month plus the number of days in that month. The offset for August 2023 is 2, and there are 31 days in August. The sum of 2 and 31 is 33, and the remainder of 33 divided by 7 is 5.</p>

        <p>Because the number of days in a month doesn't change (except February in a leap year), the month offsets follow the same pattern from year to year. If you calculate the offset for a given year, you can get any month offset in that year by adding the month pattern offset.</p>

        <p>Month pattern offsets:</p>

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

        <p>Pro tip: <em>Memorize this pattern</em>.</p>

        <h2>Year Offsets</h2>

        <p>Just like the month offset, you can think of the <em>year offset</em> as the number of placeholders in the week before the first day of the year.</p>

        <p>To get the year offset, start with the two-digit year, divide by 4 to get the number of leap days from 2001 to that year, and add the number of leap days to the two-digit year.</p>

        <p>For 2023, the two-digit year is 23. The whole number of 23 divided by 4 is 5, so there are 5 leap days from 2001 to 2023. Add that to 23, and you get 28. Since 28 days is exactly four weekly cycles, the offset for 2023 is 0.</p>


        <h2>Leap Years</h2>

        <p>If the date you want is in January or February of a leap year, there's one small adjustment you need to make. To compensate for the leap day, just subtract 1 at some point in your process. Let's take an example: Febuary 4, 2024.</p>

        <p>
            <ul>
                <li>Start with the <em>year offset</em>: 24 + 6 = 30 = 2.</li>
                <li>The <em>month offset</em> for February is the <em>year offset</em> + 3, so 5. </li>
                <li>Add that to the date, for a total of 9, so 2.</li>
                <li>To adjust for the leap year, Subtract 1, giving a result of 1.</li>
            </ul>
            So February 4, 2024 is on the 1st day of the week.</p>

        <h2>Other Centuries</h2>

        <p>As with months and years, each century has its own--you guessed it--offset. The offset for the 21st century happens to be 0, which is why there's no need to add one when finding the day of the week this century.</p>

        <p>The 20th century had an offset of 1. If you want to find the day of the week for a date in the 1900s, just follow the process above, and add 1.</p>

        <p>The 19th century had an offset of 3, and the 18th century had an offset of 5. The 1600s are exactly the same as the 2000s, so September 16, 1623 was a Saturday, just like September 16, 2023.</p>

        <p>For earlier centuries, you can take the integer value of any year in that century divided by 100, and subtract that from 19. So for the 1500s, the offset is 4; for the 1400s, it's 5; for the 700s, it's 12 = 5; &c.</p>

        <p>Unless the date is after October 4, 1582. In that case, just treat it as though it was in the 1900s instead of the 1500s.</p>
        {/* 

        <hr />
        <IllustrateMonth monthNdx="0" year="2023"></IllustrateMonth>

        <p>Notice how every date matches the day of the week: January 1 was Sunday, January 4 was Wednesday, Janauary 23 was Monday, and so on.</p>

        <h2>Month Offsets</h2>

        <p>Most months, however, aren't like this. For most months, we have to shift the dates to get them to line up with the weekly cycle. You may have noticed the empty spaces before the first day of the month in a standard calendar. This is why.</p>

        <p>For example, February 2023 started on a Wednesday:</p>

        <IllustrateMonth monthNdx="1" year="2023"></IllustrateMonth>

        <p>Notice that there are three empty spaces before February 1, 2023. These spaces are what we'll call the <em>month offset</em>. A calendar works by adding the month offset to the date, so that the date lines up with the correct day in the weekly cycle.</p>

        <p>The 12-digit calendar is just a list of the month offsets for a given year. For 2023, the calendar is 0 3 3 6 1 4 6 2 5 0 3 5.</p>

        <p>The month offset for January is 0, and there are 31 days in January. This means the last day of January is a Tuesday and that the first day of February is therefore Wednesday. Since the first day of February is the fourth day in the weekly cycle, the month offset for February is 4 - 1, or 3. Likewise, the last day of February 2023 is the 28th. 28 + 3 = 31, and the 31st day in the weekly cycle is the same as the 3rd, which is a Tuesday. Since the last day of February is a Tuesday, the first day of March is a Wednesday. This again gives a month offset of 3 for March. And so on.</p>

        <p>Or you could just memorize the 12 digits. The same digits won't work again for several more years, but the digits for 2023 happen to also be the <em>generic month offset</em> template, which you can use to get the digits for any other year.</p>

        <h2>Year Offsets</h2>

        <p>The <em>year offset</em> is really just the month offset for January of that year. Usually, a year doesn't begin on the first day in the weekly cycle. However, because there are 365 years in a non-leap year, and 365 modulo 7 is 1, the year offset for a non-leap year that follows a non-leap year is always just one greater. You may have noticed that a date in one year is usually just one day after the same date in the previous year. This is why.</p>

        <p>As it happens, the year offset for 2001 is 1. Were it not for a leap year every four years, we could just take the two-digit year modulo 7 and have the year offset.</p>

        <p>However, because of leap years, there's an extra day every fourth year, and this has to be accounted for in determining the <em>year offset</em>.</p>

        <p>Here's a list of the years from 2001 to 2023, with the leap years marked:</p>

        {illustrateLeapYears(2023)}

        <p>Since there are 5 leap years, we get the year offset for 2023 by adding 5 to 23, for a total of 28. This exactly fills out four weekly cycles (28 = 4x7), so the year offset for 2023 is 0.</p>

        <p>Once you have the year offset, you can add the generic month offset, and the sum is the month offset within that year. For example, Let's find the month offset for July, 2037.</p>

        {illustrateLeapYears(2037)}

        <p>There are 9 leap years, so add 9 + 37, for a total of 46. Dividing by 7 leaves a remainder of 4, so the year offset for 2037 is 4. Now, add the generic month offset for July. 4 + 6 = 10, which leaves a remainder of 3. The month offset for July 2037 is 3:</p>

        <IllustrateMonth monthNdx="6" year="2037"></IllustrateMonth>

        <h2>Leap Years</h2>

        <p>If your target date is in January or February of a leap year, there's one small adjustment you need to make: just subtract 1 from the month offset.</p>

        <p>For example, take February 4, 2024.</p>
        <ul>
            <li>Leap days: 6</li>
            <li>Two-digit year: 24</li>
            <li>Year offset: 2</li>
            <li>Generic month offset for February: 3</li>
            <li>So month offset for February: 5</li>
            <li>Subtract 1 for February in a leap year: 4</li>
        </ul>
        <p>The month offset for February 2024 is 4.</p>

        <IllustrateMonth monthNdx="1" year="2024"></IllustrateMonth>

        <h2>Practice</h2>

        <p>That's everything you need to find the day of the week for any date this century.</p>
        {/* 




        <p>The process of finding the year offset exploits a convenient and fortuitous fact about the year 2000. It began on a Saturday, but because it was a leap year, all dates after February 29 line up with the weekly cycle just as they would if the year had been a non-leap year that began on a Sunday.</p>

        <p>Another factor is that there are 365 days in a non-leap year. Since 365 divided by 7 leaves a remainder of 1, the dates of one year will usually be one weekday after the dates of the previous year.</p>

        <p>However, a leap year adds an extra day, so that if the leap day occurs between two dates, the later date is <em>two</em> weekdays after the earlier one.</p>

        <p>To get the year offset, use the two-digit year. Divide the year by 4 (ignore any remainder), and add the result to the year. For example, for 2025, divide 25 by 4, giving you 6, and add that to 25. So the year offset for 2025 is 31. But since 31 divided by 7 leaves a remainder of 3, the year offset for 2025 is 3.</p>

        <hr />





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

        <p>You can calculate the <em>year offset</em>, but you will simply need to learn the <em>generic month offsets</em>.</p>

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

        <p>The process of finding the year offset exploits a convenient and fortuitous fact about the year 2000. It began on a Saturday, but because it was a leap year, all dates after February 29 line up with the weekly cycle just as they would if the year had been a non-leap year that began on a Sunday.</p>

        <p>Another factor is that there are 365 days in a non-leap year. Since 365 divided by 7 leaves a remainder of 1, the dates of one year will usually be one weekday after the dates of the previous year.</p>

        <p>However, a leap year adds an extra day, so that if the leap day occurs between two dates, the later date is <em>two</em> weekdays after the earlier one.</p>

        <p>To get the year offset, use the two-digit year. Divide the year by 4 (ignore any remainder), and add the result to the year. For example, for 2025, divide 25 by 4, giving you 6, and add that to 25. So the year offset for 2025 is 31. But since 31 divided by 7 leaves a remainder of 3, the year offset for 2025 is 3.</p>

        <h3>Month Offset</h3>

        <p>The month offset is the sum of the <em>generic month offset</em> and the <em>year offset</em>. For January, the generic month offset is 0. Since the year offset for 2025 is 3, the month offset for January 2025 is 0 + 3, or 3.</p>

        {illustrateLeapYears(2025)}
        */}
    </div>)
}

export default Instructions;