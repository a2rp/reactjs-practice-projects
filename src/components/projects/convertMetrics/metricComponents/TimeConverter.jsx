import React, { useState } from "react";

const units = [
    { name: "Nanosecond", key: "nanosecond", toSec: 1e-9 },
    { name: "Microsecond", key: "microsecond", toSec: 1e-6 },
    { name: "Millisecond", key: "millisecond", toSec: 1e-3 },
    { name: "Second", key: "second", toSec: 1 },
    { name: "Minute", key: "minute", toSec: 60 },
    { name: "Hour", key: "hour", toSec: 3600 },
    { name: "Day", key: "day", toSec: 86400 },
    { name: "Week", key: "week", toSec: 604800 },
    { name: "Month", key: "month", toSec: 2.628e6 },
    { name: "Calendar Year", key: "calendaryear", toSec: 3.154e7 },
    { name: "Decade", key: "decade", toSec: 3.154e8 },
    { name: "Century", key: "century", toSec: 3.154e9 },
];

const TimeConverter = () => {
    const [values, setValues] = useState(
        units.reduce((acc, unit) => ({ ...acc, [unit.key]: 0 }), {})
    );

    const handleChange = (e, fromUnit) => {
        const inputVal = parseFloat(e.target.value);
        if (isNaN(inputVal)) return;

        const fromSec = inputVal * fromUnit.toSec;

        const updatedValues = {};
        units.forEach((unit) => {
            updatedValues[unit.key] = fromSec / unit.toSec;
        });

        setValues(updatedValues);
    };

    return (
        <Wrapper>
            <Title>Time Converter</Title>
            {units.map((unit) => (
                <InputRow key={unit.key}>
                    <Label htmlFor={unit.key}>{unit.name}</Label>
                    <Input
                        type="number"
                        id={unit.key}
                        value={values[unit.key]}
                        onChange={(e) => handleChange(e, unit)}
                    />
                </InputRow>
            ))}
        </Wrapper>
    );
};

export default TimeConverter;

import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
    /* background: #1a1a1a; */
    border-radius: 10px;
    color: #fff;
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

export const InputRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
`;

export const Label = styled.label`
    flex: 1;
    margin-right: 12px;
    line-height: 25px;
`;

export const Input = styled.input`
    flex: 1;
    padding: 6px 10px;
    font-size: 14px;
    border: 1px solid #444;
    border-radius: 4px;
    /* background-color: #2a2a2a; */
    /* color: white; */

    &:focus {
        outline: none;
        border-color: #00f0ff;
    }
`;
