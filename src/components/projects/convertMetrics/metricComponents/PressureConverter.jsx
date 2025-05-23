import React, { useState } from "react";

const PressureConverter = () => {
    const [values, setValues] = useState({
        bar: "",
        pascal: "",
        poundpersquareinch: "",
        standardatmosphere: "",
        torr: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        const v = parseFloat(value);
        if (isNaN(v)) {
            setValues((prev) => ({ ...prev, [id]: value }));
            return;
        }

        switch (id) {
            case "bar":
                setValues({
                    bar: value,
                    pascal: v * 100000,
                    poundpersquareinch: v * 14.5038,
                    standardatmosphere: v * 0.986923,
                    torr: v * 750.062,
                });
                break;
            case "pascal":
                setValues({
                    bar: v * 1e-5,
                    pascal: value,
                    poundpersquareinch: v * 0.000145038,
                    standardatmosphere: v * 9.8692e-6,
                    torr: v * 0.00750062,
                });
                break;
            case "poundpersquareinch":
                setValues({
                    bar: v * 0.0689476,
                    pascal: v * 6894.76,
                    poundpersquareinch: value,
                    standardatmosphere: v * 0.068046,
                    torr: v * 51.7149,
                });
                break;
            case "standardatmosphere":
                setValues({
                    bar: v * 1.01325,
                    pascal: v * 101325,
                    poundpersquareinch: v * 14.6959,
                    standardatmosphere: value,
                    torr: v * 760,
                });
                break;
            case "torr":
                setValues({
                    bar: v * 0.00133322,
                    pascal: v * 133.322,
                    poundpersquareinch: v * 0.0193368,
                    standardatmosphere: v * 0.00131579,
                    torr: value,
                });
                break;
            default:
                break;
        }
    };

    return (
        <Wrapper>
            Enter value in any of the input boxes below:
            <br />
            <InputRow>
                <Input
                    id="bar"
                    className="pressure"
                    value={values.bar}
                    onChange={handleChange}
                />
                <UnitSpan id="bar_span">{values.bar}</UnitSpan>
                <Label>Bar</Label>
            </InputRow>
            <InputRow>
                <Input
                    id="pascal"
                    className="pressure"
                    value={values.pascal}
                    onChange={handleChange}
                />
                <UnitSpan id="pascal_span">{values.pascal}</UnitSpan>
                <Label>Pascal</Label>
            </InputRow>
            <InputRow>
                <Input
                    id="poundpersquareinch"
                    className="pressure"
                    value={values.poundpersquareinch}
                    onChange={handleChange}
                />
                <UnitSpan id="poundpersquareinch_span">
                    {values.poundpersquareinch}
                </UnitSpan>
                <Label>Pound per square inch</Label>
            </InputRow>
            <InputRow>
                <Input
                    id="standardatmosphere"
                    className="pressure"
                    value={values.standardatmosphere}
                    onChange={handleChange}
                />
                <UnitSpan id="standardatmosphere_span">
                    {values.standardatmosphere}
                </UnitSpan>
                <Label>Standard atmosphere</Label>
            </InputRow>
            <InputRow>
                <Input
                    id="torr"
                    className="pressure"
                    value={values.torr}
                    onChange={handleChange}
                />
                <UnitSpan id="torr_span">{values.torr}</UnitSpan>
                <Label>Torr</Label>
            </InputRow>
        </Wrapper>
    );
};

export default PressureConverter;

import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    border-radius: 5px;
    height: calc(100% - 4px);
    overflow: auto;
`;

export const InputRow = styled.div`
    display: flex;
    align-items: center;
    margin: 4px 0;
`;

export const Input = styled.input`
    font-size: 12px;
    font-family: Consolas, monospace;
    height: 25px;
    width: 300px;
    margin: 2px;
    padding-left: 10px;
`;

export const Label = styled.span`
    margin-left: 8px;
`;

export const UnitSpan = styled.span`
    margin-left: 6px;
    font-weight: bold;
    color: #555;
`;
