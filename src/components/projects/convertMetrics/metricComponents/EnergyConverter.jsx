import React, { useState } from "react";
import { Container, Row, Input } from "./styled";

const units = [
    "joule",
    "kilojoule",
    "gramcalorie",
    "kilocalorie",
    "watthour",
    "kilowatthour",
    "electronvolt",
    "britishthermalunit",
    "ustherm",
    "footpound",
];

// Conversion factors from joules
const fromJoule = {
    joule: 1,
    kilojoule: 0.001,
    gramcalorie: 0.239006,
    kilocalorie: 0.000239006,
    watthour: 0.000277778,
    kilowatthour: 2.7778e-7,
    electronvolt: 6.242e18,
    britishthermalunit: 0.000947817,
    ustherm: 9.4804e-9,
    footpound: 0.737562,
};

// Inverse conversion to joules
const toJoule = {
    joule: 1,
    kilojoule: 1000,
    gramcalorie: 4.184,
    kilocalorie: 4184,
    watthour: 3600,
    kilowatthour: 3.6e6,
    electronvolt: 1.6022e-19,
    britishthermalunit: 1055.06,
    ustherm: 1.055e8,
    footpound: 1.355582,
};

const EnergyConverter = () => {
    const [values, setValues] = useState(
        units.reduce((acc, unit) => ({ ...acc, [unit]: 0 }), {})
    );
    const [activeUnit, setActiveUnit] = useState("");

    const convertFrom = (unit, val) => {
        const jouleVal = val * (toJoule[unit] || 1);
        const newValues = {};

        units.forEach((u) => {
            newValues[u] = jouleVal * (fromJoule[u] || 0);
        });

        setValues(newValues);
    };

    const handleChange = (e, unit) => {
        const val = parseFloat(e.target.value) || 0;
        setActiveUnit(unit);
        convertFrom(unit, val);
    };

    return (
        <Container>
            Enter value in any of the input box below:
            <br />
            {units.map((unit) => (
                <Row key={unit}>
                    <Input
                        type="text"
                        value={values[unit]}
                        onChange={(e) => handleChange(e, unit)}
                    />{" "}
                    <span>{activeUnit === unit ? values[unit] : ""}</span>{" "}
                    {unit}
                </Row>
            ))}
        </Container>
    );
};

export default EnergyConverter;
