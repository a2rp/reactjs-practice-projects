import React, { useState } from "react";
import { Container, Row, Input } from "./styled";

const units = [
    "degree",
    "gradian",
    "milliradian",
    "minuteofarc",
    "radian",
    "secondofarc",
];

const toRadian = {
    degree: 0.0174533,
    gradian: 0.015708,
    milliradian: 0.001,
    minuteofarc: 0.000290888,
    radian: 1,
    secondofarc: 4.8481e-6,
};

const fromRadian = {
    degree: 57.2958,
    gradian: 63.662,
    milliradian: 1000,
    minuteofarc: 3437.75,
    radian: 1,
    secondofarc: 206265,
};

const PlaneAngleConverter = () => {
    const [values, setValues] = useState(
        units.reduce((acc, unit) => ({ ...acc, [unit]: 0 }), {})
    );
    const [active, setActive] = useState("");

    const handleChange = (e, unit) => {
        const inputVal = parseFloat(e.target.value) || 0;
        setActive(unit);

        const inRadian = inputVal * toRadian[unit];
        const newValues = {};

        units.forEach((u) => {
            newValues[u] = inRadian * fromRadian[u];
        });

        setValues(newValues);
    };

    return (
        <Container>
            Enter value in any of the input box below:
            <br />
            {units.map((unit) => (
                <Row key={unit}>
                    <Input
                        className="planeangle"
                        value={values[unit]}
                        onChange={(e) => handleChange(e, unit)}
                    />
                    <span>{active === unit ? values[unit] : ""}</span> {unit}
                </Row>
            ))}
        </Container>
    );
};

export default PlaneAngleConverter;
