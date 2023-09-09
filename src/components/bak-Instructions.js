const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Instructions() {
    return (<div>
        <h1>The 12-Digit Calendar</h1>

        <h2>Overview</h2>

        <p><strong>To get the day of the week, add: </strong></p>

        <p>Two-digit year, leap days, century offset, month offset, date, leap year adjustment (Jan, Feb).</p>

        <p><strong>To get the 12-digit calendar, calculate the January offset. Add:</strong></p>

        <p>Two-digit year, leap days, century offset.</p>

        <p><strong>Then:</strong></p>

        <p>Add January offset to each generic month offset.</p>

        <p>These are the processes you’ll want to get comfortable with. The details are below.</p>

        <h2>Introduction</h2>

        <p>The year is 2023. The 12-digit calendar for this year is <strong>0 3 3 6 1 4 6 2 5 0 3 5</strong>, with each digit representing the month offset for its respective month:</p>

        <div><strong>Month Offsets</strong></div>
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


        <p>
            You can use this to find the day of the week for any date in the year. You just add the date to the month offset, and take the remainder of the sum divided by 7.
            For example, to find the day of the week for August 16, add 2 (month offset for August) to 16, and take the remainder of 18 divided by 7, which is 4. So August 16 is on the 4th day of the week: Wednesday.
        </p>

        <h2>Basics</h2>

        <p>When working with calendars, there are a few things that will make life easier: The multiplication table, division and getting remainders, and identifying leap years.</p>

        <p><strong>The Multiplication Table</strong>. Especially the 7s and the 4s. Working with calendars involves a lot of 7s, since that's how many days there are in the week. If you know that 35 is divisible by 7, or that 51 divided by 7 leaves a remainder of 2, you're in good shape.</p>

        <p><strong>Remainders / x modulo y</strong>. Something you'll do all the time is get sums and then divide by 7 and take the remainder. The term for this is “modulo”; for example, the sum of 9 and 32, modulo 7, is 6. The sum of 75, 18, 5, and 25, modulo 7, is 4. If you're adding numbers and find that your sum is getting unwieldy, you can take modulo 7 at any time, just to get a more comfortable value to work with. Since the weekly cycle is 7 days, modulo 7 will usually make no difference to the final result.</p>

        <p><strong>Leap Years</strong>. We all know that, generally speaking, every fourth year is a leap year. So 2008 was a leap, as were 2012 and 2016. How about 1986? Or 1972? You'll want to be able to easily identify leap years. Also, you’ll want to know about century years. Most century years have been leap years, but since 1600, century years are non-leap years unless they’re divisible by 400. So 1700, 1800, and 1900 were non-leap years, but 2000 was a leap year.</p>

        <h3>And you will also want to be familiar with...</h3>

        <p><strong>The 12-digit Calendar</strong></p>

        <p>We just saw that the 12-digit calendar for 2023 is <strong>0 3 3 6 1 4 6 2 5 0 3 5</strong>. Because it starts with 0, this is also the generic month offset list. This, like the multiplication table, would be worth memorizing.</p>

        <p>The concept of the 12-digit calendar is simple. Each of the 12 months is represented by a “month offset,” which is a single-digit number in the range of 0 - 6 If you open a calendar app and look at the calendar grid for the year, you'll see the standard set of four or five “week” rows in a given month. For example: February, 2023:</p>

        <div className="month-grid">
            {WEEKDAYS.map((wd, key) => <div key={key}>{wd}</div>)}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            {Object.keys(Array(28).fill(0)).map((n, key) => <div key={key}>{n * 1 + 1}</div>)}
            <div></div>
            <div></div>
            <div></div>

        </div>

        <p>You'll also notice that the top row for most months has fewer than seven “date” numbers. If the first day of the month is, say, Wednesday, the top row will have an empty spot for Sunday, Monday, and Tuesday. If the first day of the month is Saturday, the top row will have six empty spots: Sunday through Friday. And so on. The number of empty spots for a month is the "month offset."</p>

        <h3>Practical Use: Finding the Day of the Week</h3>

        <p>To find the day of the week, all you have to do is add the date to the month offset, and take modulo 7. If the result is 1 to 6, the day of the week is Sunday to Friday. If the result is 0, the day of the week is Saturday. This is because Saturday is day 7 in the weekly cycle, and 7 modulo 7 is 0.</p>

        <p>Let's try an example: March 17, 2023. The month offset for March 2023 is 3. Add 3 to 17, giving a sum of 20. 20 modulo 7 is 6. The 6th day of the week is Friday. So March 17, 2023 was a Friday.</p>

        <p>How about October 28? The month offset for October 2023 is 0. The sum of 0 and 28, modulo 7 is 0. That's a Saturday, since Saturday is the 7th day, and 7 modulo 7 is 0.</p>

        <p>So that's the basics.</p>

        <p>For any year, you can get the 12-digit calendar just by looking at the months for that year and getting the month offset, or the number of empty spaces before the first day of each month. Then, armed with a 12-digit calendar, you can find the day of the week for any date in that year.</p>

        <p>Next, we're going to look at finding the 12-digit calendar for any year. We'll also look at directly calculating the day of the week for any date, without getting the calendar first.</p>

        <h2>A Little More Ambitious</h2>

        <p>We'll start with years in the 21st century, and we'll use 2025 as an example. Here's what you do: Take the two-digit year (25), and add the number of leap days since the beginning of the century (6). Then, to get the 12-digit calendar, add the sum (31) to the generic month offset (see above) for each month. (At any point in this process, you can take modulo 7 if you want a smaller number to work with. For 31, that's 3.)</p>

        <p>NOTE: We get the leap days by dividing the two-digit year by 4. If there's a remainder, we ignore it. Since 25 divided by 4 is 6, we add 6 leap days.</p>

        <p>For 2025, adding 3 to the generic offset for each month, we get:</p>

        <div className="year-example">
            <div>January: 0 + 3 = 3</div>
            <div>February: 3 + 3 = 6</div>
            <div>March: 3 + 3 = 6</div>
            <div>April: 6 + 3 = 9, modulo 7 = 2</div>
            <div>May: 1 + 3 = 4</div>
            <div>June: 4 + 3 = 7, modulo 7 = 0</div>
            <div>July: 6 + 3 = 9, modulo 7 = 2</div>
            <div>August: 2 + 3 = 5</div>
            <div>September: 5 + 3 = 8, modulo 7 = 1</div>
            <div>October: 0 + 3 = 3</div>
            <div>November: 3 + 3 = 6</div>
            <div>December: 5 + 3 = 8, modulo 7 = 1</div>
        </div>

        <p>So the 12-digit calendar for 2025 is <strong>3 6 6 2 4 0 2 5 1 3 6 1</strong>.</p>

        <p>Let's put it to use by finding the day of the week for Halloween. October's offset is 1, plus 31 is 32, modulo 7 is 4. So Halloween 2025 is a Wednesday.</p>

        <h2>What about leap years?</h2>

        <p>If you're going for a leap year, follow the same steps as for a normal year, but then adjust the month offsets for January and February by subtracting 1 from each.</p>

        <p>Let's try it with 2024. Take the two-digit year (24), and add the leap days (6). The sum is 30, modulo 7 is 2.</p>

        <p>Add 2 to the generic offset for each month, and subtract 1 for January and February:</p>

        <div className="year-example">
            <div>January: 0 + 2 - 1 = 1</div>
            <div>February: 3 + 2 - 1 = 4</div>
            <div>March: 3 + 2 = 5</div>
            <div>April: 6 + 2 = 8, modulo 7 = 1</div>
            <div>May: 1 + 2 = 3</div>
            <div>June: 4 + 2 = 6</div>
            <div>July: 6 + 2 = 8, modulo 7 = 1</div>
            <div>August: 2 + 2 = 4</div>
            <div>September: 5 + 2 = 7, modulo 7 = 0</div>
            <div>October: 0 + 2 = 2</div>
            <div>November: 3 + 2 = 5</div>
            <div>December: 5 + 2 = 7, modulo 7 = 0</div>
        </div>

        <p>So the 12-digit calendar for 2024 is <strong>1 4 5 1 3 6 1 4 0 2 5 0</strong>.</p>

        <p>So there it is. In a few simple steps, you can get a calendar for any year in the 21st century.</p>

        <h2>Now, how about for earlier years?</h2>

        <p>You can extend the above technique to any year, just by adding the century offset for that year.</p>

        <h3>Century offset</h3>

        <h3>The century offsets for 1600 - 1900:</h3>

        <p>So let's see how the century offset is used.</p>

        <p>Example: 1975. That's in the 1900s, so the century offset is 1. Take the two-digit year (75), and add the leap days (18). Now, add the century offset (1). Take modulo 7, giving a result of 3. Construct the calendar for 1975 by adding 3 to each generic offset: 3 6 6 2 4 0 2 5 1 3 6 1. [Note, 75 modulo 7 is 5, and 18 modulo 7 is 4. 5 + 4 + 1 is 10, modulo 7 is 3.]</p>

        <p>How about for a leap year? 900. This time, the century offset is 19 - 9 = 10, modulo 7 = 3. So take the two-digit year (00), add the leap days (0). Then add the century offset of 3. The result is 3. The 12-digit calendar, with January and February adjusted for the leap year, is 2 5 6 2 4 0 2 5 1 3 6 1. New Year's Day was a Tuesday, and Christmas Day was a Thursday.</p>

        <h3>Calculate Just Day of Week</h3>

        <p>OK, that's great, but what if you don't care about getting the 12-digit calendar, per se, and you just want to get the day of the week for a particular date?</p>

        <p>This is very similar to the above. All you have to do is add the two-digit year, the leap days, the generic month offset for the target month, and the date. Then, if the year is a leap year and the target month is January or February, subtract 1. Take modulo 7, and the result is the day of the week.</p>

        <p>Example: Christmas Day, 2037. Two-digit year (37), leap days (9), generic month offset for December (5), date (25). The sum of those, modulo 7 is 6. So December 25, 2037 is a Friday.</p>

        <p>Another: January 1, 2044. Two-digit year: 44, leap days: 11, month offset for January: 0, date: 1. The sum of those is 56. Since this is a leap year, and the month is January, subtract 1. Then take 55 modulo 7, which is 6. January 1, 2044 is a Friday.</p>

        <p>Other examples:</p>

        <p>January 1, 1933. Sunday: Two-digit year (33), leap days (8), month offset (0), date (1), century offset (1); sum modulo 7 is 1.</p>
        <p>July 4, 1776. Thursday: Two-digit year (76), leap days (19), month offset (6), date (4), century offset (5); modulo 7 = 5.</p>
        <p>December 25, 1621. Saturday. Two-digit year (21), leap days (5), month offset (5), date (25), century offset (0); modulo 7 = 0.</p>
        <p>August 16, 1117. Thursday. Two-digit year (17), leap days (4), month offset (2), date (16), century offset (8); modulo 7 = 5.</p>
        <p>February 4, 1872. Sunday. Two-digit year (72), leap days (18), month offset (3), date (4), century offset (3), leap year adjustment for February (-1); modulo 7 = 1.</p>


        <p>That’s pretty much it. Become comfortable with the generic month offsets and the century offsets, and you can get a calendar for any year, or directly find the day of the week for any date.</p>


        <h2>Except…</h2>

        <p>The Calendar Change. October 1582.</p>

        <p>The official word is that 10 days were dropped from the calendar in October 1582, so that Thursday, October 4 was followed by Friday, October 15.</p>

        <p>So, while what we've covered will allow you to calculate most dates in the 1500s, it will fail spectacularly for anything after October 4 in the 16th century.</p>

        <p>So here's what you do. Instead of getting the century offset by subtracting 15 from 19, treat the last nearly two decades of the 1500s as if they were from the 1900s, and use 1 as the century offset. This should give you a Friday for October 15, 1582:</p>

        <p>Two-digit year (82), leap days (20), month offset (0), date (15), century offset (1); modulo 7 = 6. Friday.</p>

        <p>The calendar for 1582 is weird: 1 4 4 0 2 5 0 3 6 1 … October gets mangled … 5 1 3</p>

    </div>)
}

export default Instructions;