import React, { useState } from "react";
import { Container, Row, Input } from "./styled";

const units = [
    "tonne",
    "kilogram",
    "gram",
    "milligram",
    "microgram",
    "imperialton",
    "uston",
    "stone",
    "pound",
    "ounce",
];

// Conversion factors from kilogram to each unit
const fromKg = {
    tonne: 0.001,
    kilogram: 1,
    gram: 1000,
    milligram: 1e6,
    microgram: 1e9,
    imperialton: 0.000984207,
    uston: 0.00110231,
    stone: 0.157473,
    pound: 2.20462,
    ounce: 35.274,
};

// Conversion factors to kilogram from each unit
const toKg = {
    tonne: 1000,
    kilogram: 1,
    gram: 0.001,
    milligram: 1e-6,
    microgram: 1e-9,
    imperialton: 1016.05,
    uston: 907.185,
    stone: 6.35029,
    pound: 0.453592,
    ounce: 0.0283495,
};

const MassConverter = () => {
    const [values, setValues] = useState(
        units.reduce((acc, u) => ({ ...acc, [u]: 0 }), {})
    );
    const [activeUnit, setActiveUnit] = useState("");

    const convertFrom = (unit, value) => {
        const inKg = value * (toKg[unit] || 1);
        const updated = {};

        units.forEach((u) => {
            updated[u] = inKg * fromKg[u];
        });

        setValues(updated);
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
                    />
                    <span>{activeUnit === unit ? values[unit] : ""}</span>{" "}
                    {unit}
                </Row>
            ))}
        </Container>
    );
};

export default MassConverter;
