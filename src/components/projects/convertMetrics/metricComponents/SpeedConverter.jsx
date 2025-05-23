// components/converters/SpeedConverter.jsx
import React, { useState } from "react";

const units = [
    { name: "Miles per hour", key: "milesperhour" },
    { name: "Foot per second", key: "footpersecond" },
    { name: "Meter per second", key: "meterpersecond" },
    { name: "Kilometer per hour", key: "kilometerperhour" },
    { name: "Knot", key: "knot" },
];

const SpeedConverter = () => {
    const [values, setValues] = useState({
        milesperhour: 0,
        footpersecond: 0,
        meterpersecond: 0,
        kilometerperhour: 0,
        knot: 0,
    });

    const convertFrom = (key, inputValue) => {
        const value = parseFloat(inputValue) || 0;
        let updated = {};

        switch (key) {
            case "milesperhour":
                updated = {
                    milesperhour: value,
                    footpersecond: value * 1.46667,
                    meterpersecond: value * 0.44704,
                    kilometerperhour: value * 1.60934,
                    knot: value * 0.868976,
                };
                break;
            case "footpersecond":
                updated = {
                    milesperhour: value * 0.681818,
                    footpersecond: value,
                    meterpersecond: value * 0.3048,
                    kilometerperhour: value * 1.09728,
                    knot: value * 0.592484,
                };
                break;
            case "meterpersecond":
                updated = {
                    milesperhour: value * 2.23694,
                    footpersecond: value * 3.28084,
                    meterpersecond: value,
                    kilometerperhour: value * 3.6,
                    knot: value * 1.94384,
                };
                break;
            case "kilometerperhour":
                updated = {
                    milesperhour: value * 0.621371,
                    footpersecond: value * 0.911344,
                    meterpersecond: value * 0.277778,
                    kilometerperhour: value,
                    knot: value * 0.539957,
                };
                break;
            case "knot":
                updated = {
                    milesperhour: value * 1.15078,
                    footpersecond: value * 1.68781,
                    meterpersecond: value * 0.514444,
                    kilometerperhour: value * 1.852,
                    knot: value,
                };
                break;
            default:
                break;
        }

        setValues(updated);
    };

    return (
        <Wrapper>
            <Title>Enter value in any of the input box below:</Title>
            <Container>
                {units.map((unit) => (
                    <InputGroup key={unit.key}>
                        <InputField
                            type="number"
                            value={values[unit.key]}
                            onChange={(e) =>
                                convertFrom(unit.key, e.target.value)
                            }
                        />
                        <Label>{unit.name}</Label>
                    </InputGroup>
                ))}
            </Container>
        </Wrapper>
    );
};

export default SpeedConverter;

// components/converters/styled.js
import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    border-radius: 5px;
    height: calc(100% - 4px);
    overflow: auto;
`;

export const Title = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
`;

export const Container = styled.div``;

export const InputGroup = styled.div`
    margin: 5px 0;
`;

export const InputField = styled.input`
    font-size: 12px;
    font-family: Consolas, monospace;
    height: 25px;
    width: 300px;
    padding-left: 10px;
`;

export const Label = styled.span`
    margin-left: 10px;
`;
