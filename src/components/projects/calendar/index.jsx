import React, { useEffect, useState } from "react";
import {
    Wrapper,
    CalendarTable,
    DateTimeRow,
    YearRow,
    MonthRow,
    DaysRow,
    DateRow,
    DateCol,
    Heading,
    CurrentDateTime,
    MonthNamesRow,
    MonthNamesCol,
    MonthsWrapper,
    MonthName,
} from "./styled";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const Calendar = () => {
    const dayName = [
        "SUN",
        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT",
    ];
    const monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const [datetime, setDatetime] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(datetime.getMonth());
    const [currentYear, setCurrentYear] = useState(datetime.getFullYear());

    useEffect(() => {
        const interval = setInterval(() => setDatetime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const generateCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
        const rows = [];
        let date = 1;

        for (let i = 0; i < 6; i++) {
            const row = [];
            for (let j = 0; j < 7; j++) {
                const index = i * 7 + j;
                if (index >= firstDay && date <= totalDays) {
                    const isToday =
                        date === datetime.getDate() &&
                        currentMonth === datetime.getMonth() &&
                        currentYear === datetime.getFullYear();
                    row.push(
                        <DateCol key={index} className={isToday ? "today current-month" : "current-month"}>
                            {date}
                        </DateCol>
                    );
                    date++;
                } else {
                    row.push(<DateCol key={index}></DateCol>);
                }
            }
            rows.push(<DateRow key={i}>{row}</DateRow>);
        }

        return rows;
    };


    return (
        <Wrapper>
            <Heading>Calendar</Heading>
            <CurrentDateTime>{datetime.toString()}</CurrentDateTime>
            <CalendarTable>
                <tbody>
                    {/* <DateTimeRow>
                        <td colSpan={7}>
                            <div className="wrapper">
                                date
                            </div>
                        </td>
                    </DateTimeRow> */}

                    <YearRow>
                        <td
                            colSpan={2}
                            onClick={() => setCurrentYear((prev) => prev - 1)}
                        >
                            <FaCaretLeft />
                        </td>
                        <td colSpan={3}>
                            <h1>
                                {/* {monthName[currentMonth]}, {currentYear} */}
                                {currentYear}
                            </h1>
                        </td>
                        <td
                            colSpan={2}
                            onClick={() => setCurrentYear((prev) => prev + 1)}
                        >
                            <FaCaretRight />

                        </td>
                    </YearRow>


                    <MonthNamesRow>
                        <MonthNamesCol colSpan={7}>
                            <MonthsWrapper>
                                {monthName.map((month, idx) => (
                                    <MonthName
                                        key={idx}
                                        onClick={() => setCurrentMonth(idx)}
                                    >
                                        {month.slice(0, 3)}
                                    </MonthName>
                                ))}
                            </MonthsWrapper>
                        </MonthNamesCol>
                    </MonthNamesRow>



                    <DaysRow>
                        {dayName.map((day) => (
                            <td key={day}>{day}</td>
                        ))}
                    </DaysRow>
                    {generateCalendar()}
                </tbody>
            </CalendarTable>
        </Wrapper >
    );
};

export default Calendar;
