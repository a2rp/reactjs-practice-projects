import React, { useState } from "react";
import { Container, Row, Input } from "./styled";

const units = ["hertz", "kilohertz", "megahertz", "gigahertz"];

const toHertzFactor = {
    hertz: 1,
    kilohertz: 1000,
    megahertz: 1e6,
    gigahertz: 1e9,
};

const FrequencyConverter = () => {
    const [values, setValues] = useState(
        units.reduce((acc, unit) => ({ ...acc, [unit]: 0 }), {})
    );
    const [activeUnit, setActiveUnit] = useState("");

    const convertFrom = (unit, inputValue) => {
        const hertzValue = inputValue * toHertzFactor[unit];
        const updated = {};
        units.forEach((u) => {
            updated[u] = hertzValue / toHertzFactor[u];
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
                    />{" "}
                    <span>{activeUnit === unit ? values[unit] : ""}</span>{" "}
                    {unit}
                </Row>
            ))}
        </Container>
    );
};

export default FrequencyConverter;
