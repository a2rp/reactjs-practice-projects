import React, { useState } from "react";

const volumeUnits = [
    { id: "usliquidgallon", label: "US liquid gallon", factor: 3.78541 },
    { id: "usliquidquart", label: "US liquid quart", factor: 0.946353 },
    { id: "usliquidpint", label: "US liquid pint", factor: 0.473176 },
    { id: "uslegalcup", label: "US legal cup", factor: 0.24 },
    { id: "usfluidounce", label: "US fluid ounce", factor: 0.0295735 },
    { id: "ustablespoon", label: "US tablespoon", factor: 0.0147868 },
    { id: "usteaspoon", label: "US teaspoon", factor: 0.00492892 },
    { id: "cubicmeter", label: "Cubic meter", factor: 1000 },
    { id: "liter", label: "Liter", factor: 1 },
    { id: "milliliter", label: "Milliliter", factor: 0.001 },
    { id: "imperialgallon", label: "Imperial gallon", factor: 4.54609 },
    { id: "impquart", label: "Imperial quart", factor: 1.13652 },
    { id: "imperialpint", label: "Imperial pint", factor: 0.568261 },
    { id: "imperialcup", label: "Imperial cup", factor: 0.284131 },
    { id: "fluidounce", label: "Imperial fluid ounce", factor: 0.0284131 },
    {
        id: "imperialtablespoon",
        label: "Imperial tablespoon",
        factor: 0.0177582,
    },
    { id: "imperialteaspoon", label: "Imperial teaspoon", factor: 0.00591939 },
    { id: "cubicfoot", label: "Cubic foot", factor: 28.3168 },
    { id: "cubicinch", label: "Cubic inch", factor: 0.0163871 },
];

const VolumeConverter = () => {
    const [values, setValues] = useState(
        volumeUnits.reduce((acc, unit) => {
            acc[unit.id] = "";
            return acc;
        }, {})
    );

    const handleChange = (e, fromUnit) => {
        const inputVal = parseFloat(e.target.value);
        if (isNaN(inputVal)) return;

        const baseValue = inputVal * fromUnit.factor;

        const newValues = {};
        volumeUnits.forEach((unit) => {
            newValues[unit.id] = (baseValue / unit.factor).toFixed(6);
        });

        setValues(newValues);
    };

    return (
        <ConverterWrapper>
            <Title>Volume Converter</Title>
            {volumeUnits.map((unit) => (
                <Row key={unit.id}>
                    <InputBox
                        type="number"
                        value={values[unit.id]}
                        onChange={(e) => handleChange(e, unit)}
                        placeholder="0"
                    />
                    <Label>{unit.label}</Label>
                </Row>
            ))}
        </ConverterWrapper>
    );
};

export default VolumeConverter;

import styled from "styled-components";

export const ConverterWrapper = styled.div`
    max-width: 800px;
    margin: auto;
    padding: 24px;
    /* background-color: #f5f5f5; */
    border-radius: 12px;
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`;

export const InputBox = styled.input`
    width: 300px;
    padding: 8px 12px;
    font-family: Consolas, monospace;
    font-size: 14px;
    margin-right: 12px;
`;

export const Label = styled.span`
    font-size: 14px;
`;
