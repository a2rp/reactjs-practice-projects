import React, { useState } from "react";
import { Container, Row, Input } from "./styled";

// List of all units used in Digital Storage conversion
const units = [
    "bit",
    "kilobit",
    "kibibit",
    "megabit",
    "mebibit",
    "gigabit",
    "gibibit",
    "terabit",
    "tebibit",
    "petabit",
    "pebibit",
    "byte",
    "kilobyte",
    "kibibyte",
    "megabyte",
    "mebibyte",
    "gigabyte",
    "gibibyte",
    "terabyte",
    "tebibyte",
    "petabyte",
    "pebibyte",
];

// Conversion formulas relative to 1 bit
const conversionFactors = {
    kilobit: 0.001,
    kibibit: 0.000976563,
    megabit: 1e-6,
    mebibit: 9.5367e-7,
    gigabit: 1e-9,
    gibibit: 9.3132e-10,
    terabit: 1e-12,
    tebibit: 9.0949e-13,
    petabit: 1e-15,
    pebibit: 8.8818e-16,
    byte: 0.125,
    kilobyte: 0.000125,
    kibibyte: 0.00012207,
    megabyte: 1.25e-7,
    mebibyte: 1.1921e-7,
    gigabyte: 1.25e-10,
    gibibyte: 1.1642e-10,
    terabyte: 1.25e-13,
    tebibyte: 1.1369e-13,
    petabyte: 1.25e-16,
    pebibyte: 1.1102e-16,
    bit: 1, // self
};

const DigitalStorageConverter = () => {
    const [values, setValues] = useState(
        units.reduce((acc, u) => ({ ...acc, [u]: 0 }), {})
    );
    const [activeUnit, setActiveUnit] = useState("");

    const convertFromBit = (bitValue) => {
        const updated = {};
        for (const unit of units) {
            updated[unit] = bitValue * (conversionFactors[unit] ?? 0);
        }
        return updated;
    };

    const convert = (unit, value) => {
        if (isNaN(value)) return;

        const toBitFactor = 1 / (conversionFactors[unit] || 1); // get inverse of unit to bit
        const bitValue = value * toBitFactor;
        const updated = convertFromBit(bitValue);
        setValues(updated);
    };

    const handleChange = (e, unit) => {
        const value = parseFloat(e.target.value) || 0;
        setActiveUnit(unit);
        convert(unit, value);
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

export default DigitalStorageConverter;
