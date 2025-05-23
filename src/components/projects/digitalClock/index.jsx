import React, { useEffect, useState, useRef } from "react";
import alarm_993 from "./alarm_993.wav";

const DigitalClock = () => {
    const [time, setTime] = useState(new Date());
    const [alarmHour, setAlarmHour] = useState("00");
    const [alarmMinute, setAlarmMinute] = useState("00");
    const [alarmOn, setAlarmOn] = useState(false);
    const [alarmMsg, setAlarmMsg] = useState("");
    const audioRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now);

            if (alarmOn) {
                const hh = String(now.getHours()).padStart(2, "0");
                const mm = String(now.getMinutes()).padStart(2, "0");

                if (hh === alarmHour && mm === alarmMinute) {
                    setAlarmMsg("⏰ Alarm Ringing!");
                    if (audioRef.current) {
                        audioRef.current.play();
                    }
                } else {
                    setAlarmMsg(`Alarm set for ${alarmHour}:${alarmMinute}`);
                }
            } else {
                setAlarmMsg("");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [alarmOn, alarmHour, alarmMinute]);

    const formatTime = (value) => String(value).padStart(2, "0");
    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    return (
        <Container>
            <Heading>Digital clock with alarm</Heading>
            <ClockBox>
                <DateBox>
                    {dayNames[time.getDay()]}, {monthNames[time.getMonth()]}{" "}
                    {time.getDate()}, {time.getFullYear()}
                </DateBox>
                <TimeLabelWrapper>
                    <TimeDisplay>{formatTime(time.getHours())}</TimeDisplay>
                    <Label>Hour</Label>
                </TimeLabelWrapper>

                <TimeLabelWrapper>
                    <TimeDisplay>{formatTime(time.getMinutes())}</TimeDisplay>
                    <Label>Minute</Label>
                </TimeLabelWrapper>

                <TimeLabelWrapper>
                    <TimeDisplay>{formatTime(time.getSeconds())}</TimeDisplay>
                    <Label>Second</Label>
                </TimeLabelWrapper>
            </ClockBox>

            <AlarmBox>
                <label>
                    <input
                        type="checkbox"
                        checked={alarmOn}
                        onChange={(e) => setAlarmOn(e.target.checked)}
                    />{" "}
                    Set Alarm
                </label>

                <DropdownTimeWapper>
                    <div className="hour">
                        <Select
                            value={alarmHour}
                            onChange={(e) => setAlarmHour(e.target.value)}
                        >
                            {Array.from({ length: 24 }, (_, i) => (
                                <option key={i} value={String(i).padStart(2, "0")}>
                                    {String(i).padStart(2, "0")}
                                </option>
                            ))}
                        </Select>
                        Hour
                    </div>

                    <div className="minute">
                        <Select
                            value={alarmMinute}
                            onChange={(e) => setAlarmMinute(e.target.value)}
                        >
                            {Array.from({ length: 60 }, (_, i) => (
                                <option key={i} value={String(i).padStart(2, "0")}>
                                    {String(i).padStart(2, "0")}
                                </option>
                            ))}
                        </Select>
                        Minute
                    </div>
                </DropdownTimeWapper>
                <AlarmMsg>{alarmMsg}</AlarmMsg>
            </AlarmBox>

            <audio ref={audioRef} src={alarm_993} preload="auto" />
        </Container>
    );
};

export default DigitalClock;

import styled from "styled-components";

export const Container = styled.div`
    font-family: "Courier New", Courier, monospace;
    color: #fff;
    background: #111;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Heading = styled.h1`
    margin: 15px;
    text-align: center;
`;

export const ClockBox = styled.div`
    /* border: 1px solid #fff; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* background: #222; */
    border-radius: 12px;
    padding: 15px;
    /* box-shadow: 0 0 20px rgba(255,255,255,0.7); */
    margin-bottom: 30px;
`;

export const TimeLabelWrapper = styled.div`
    border: 1px solid #fff;
    border-radius: 5px;;
    text-align: center;
    padding: 15px;
`;

export const TimeDisplay = styled.div`
    font-size: 60px;
    font-weight: bold;
    width: 120px;
    text-align: center;
    margin: 10px;
`;

export const Label = styled.div`
    /* border: 1px solid #f00; */
    text-align: center;
    font-size: 14px;
    color: #0ff;
`;

export const DateBox = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
    font-size: 16px;
    color: #ccc;
`;

export const AlarmBox = styled.div`
    background: #333;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;

    label {
        /* border: 1px solid #fff; */
        display: flex;
        gap: 15px;
        align-items: center;
    }
`;

export const Select = styled.select`
    font-size: 16px;
    margin: 0 5px;
    padding: 5px;
    border-radius: 5px;
`;

export const AlarmMsg = styled.div`
    margin-top: 10px;
    font-size: 14px;
    color: #ff0;


`;


const DropdownTimeWapper = styled.div`
    display: flex;
    gap: 15px;

    .hour {}

    .minute {}
`; 