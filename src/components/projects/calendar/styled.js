import styled from "styled-components";

export const Wrapper = styled.div`
    /* border: 1px solid #f00; */
    position: relative;
    height: 100%;
    /* overflow: auto; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 480px;
    margin: auto;
`;

export const Heading = styled.h1`
    text-align: center;
    margin: 30px;
`;

export const CurrentDateTime = styled.div`
    text-align: center;
    padding: 15px;
`;

export const UpdateInfo = styled.b`
    display: inline-block;
    /* height: 20px; */
    line-height: 20px;
    border: 2px solid #00f;
    color: #00f;
    padding: 0 20px;
`;

export const CalendarTable = styled.table`
    border: 1px solid rgba(255, 255, 255, 0.3);
    text-align: center;
    border-collapse: collapses;
    width: 100%;
`;

export const DateTimeRow = styled.tr`
    border: 1px solid rgba(255, 255, 255, 0.3);
    /* background-color: #111; */
    /* min-height: 50px; */
    color: #fff;

    .wrapper {
        padding: 15px;
    }
`;

export const YearRow = styled.tr`
    /* border: 1px solid rgba(255, 255, 255, 0.3); */
    background-color: #222;
    color: #fff;
    /* height: 30px; */

    td {
        /* border: 1px solid #f00; */
    }
`;

export const MonthRow = styled.tr`
    /* border: 1px solid rgba(255, 255, 255, 0.3); */

    background-color: #000;
    color: #fff;
    /* height: 30px; */
    cursor: pointer;
`;

export const MonthNamesRow = styled.tr``;
export const MonthNamesCol = styled.td``;
export const MonthsWrapper = styled.div`
    border: 1px solid rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    height: 30px;
`;
export const MonthName = styled.div`
    /* border: 1px solid rgba(255, 255, 255, 0.3); */
    flex: 1;
    border-radius: 3px;
    cursor: pointer;
    padding: 5px 0;

    &:hover {
        background-color: #aaa;
        color: #000;
    }
`;

export const DaysRow = styled.tr`
    border: 1px solid rgba(255, 255, 255, 0.3);

    /* background-color: #aaa; */
    /* height: 30px; */
    font-weight: bold;
`;

export const DateRow = styled.tr``;

export const DateCol = styled.td`
    text-align: center;
    padding: 10px;
    cursor: pointer;

    &.today {
        background-color: #444;
        color: white;
        font-weight: bold;
        border-radius: 50%;
    }

    &.current-month {
        color: #aaa;
    }

    &.other-month {
        color: #ccc;
    }
`;
