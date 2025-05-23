import React, { useState } from "react";
import { Container, Row, Input } from "./styled";

const units = [
    "milespergallon",
    "milespergallonimperial",
    "kilometerperliter",
    "literper100kilometers",
];

const FuelEconomyConverter = () => {
    const [values, setValues] = useState({
        milespergallon: 0,
        milespergallonimperial: 0,
        kilometerperliter: 0,
        literper100kilometers: 0,
    });
    const [activeUnit, setActiveUnit] = useState("");

    const convertFrom = (unit, val) => {
        const updated = {};

        switch (unit) {
            case "milespergallon":
                updated.milespergallon = val;
                updated.milespergallonimperial = val * 1.20095;
                updated.kilometerperliter = val * 0.425144;
                updated.literper100kilometers = 235.215 / val;
                break;

            case "milespergallonimperial":
                updated.milespergallonimperial = val;
                updated.milespergallon = val * 0.832674;
                updated.kilometerperliter = val * 0.354006;
                updated.literper100kilometers = 282.481 / val;
                break;

            case "kilometerperliter":
                updated.kilometerperliter = val;
                updated.milespergallon = val * 2.35215;
                updated.milespergallonimperial = val * 2.82481;
                updated.literper100kilometers = 100 / val;
                break;

            case "literper100kilometers":
                updated.literper100kilometers = val;
                updated.kilometerperliter = 100 / val;
                updated.milespergallon = 235.215 / val;
                updated.milespergallonimperial = 282.481 / val;
                break;

            default:
                break;
        }

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

export default FuelEconomyConverter;
