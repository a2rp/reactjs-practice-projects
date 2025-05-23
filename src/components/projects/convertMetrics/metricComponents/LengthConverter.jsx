import React, { useState } from "react";
import { Container, Row, Input } from "./styled";

const units = [
    "kilometre",
    "meter",
    "centimeter",
    "millimetre",
    "micrometres",
    "nanometre",
    "mile",
    "yard",
    "foot",
    "inch",
    "nauticalmile",
];

// Conversion factor from metre to each unit
const fromMeter = {
    kilometre: 0.001,
    meter: 1,
    centimeter: 100,
    millimetre: 1000,
    micrometres: 1e6,
    nanometre: 1e9,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701,
    nauticalmile: 0.000539957,
};

const toMeter = {
    kilometre: 1000,
    meter: 1,
    centimeter: 0.01,
    millimetre: 0.001,
    micrometres: 1e-6,
    nanometre: 1e-9,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254,
    nauticalmile: 1852,
};

const LengthConverter = () => {
    const [values, setValues] = useState(
        units.reduce((acc, u) => ({ ...acc, [u]: 0 }), {})
    );
    const [activeUnit, setActiveUnit] = useState("");

    const convertFrom = (unit, value) => {
        const inMeter = value * (toMeter[unit] || 1);
        const updated = {};

        units.forEach((u) => {
            updated[u] = inMeter * (fromMeter[u] || 1);
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

export default LengthConverter;
