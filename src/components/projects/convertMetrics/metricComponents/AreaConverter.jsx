import React, { useState } from "react";
import { Container, Input, Row } from "./styled";

const unitList = [
    "squarekilometer",
    "squaremeter",
    "squaremile",
    "squareyard",
    "squarefoot",
    "squareinch",
    "hectare",
    "acre",
];

const AreaConverter = () => {
    const [values, setValues] = useState(
        unitList.reduce((acc, unit) => ({ ...acc, [unit]: 0 }), {})
    );
    const [activeUnit, setActiveUnit] = useState("");

    const handleChange = (e, unit) => {
        const val = parseFloat(e.target.value) || 0;
        setActiveUnit(unit);

        const updated = { ...values, [unit]: val };

        switch (unit) {
            case "squarekilometer":
                updated.squaremeter = val * 1000000;
                updated.squaremile = val * 0.386102;
                updated.squareyard = val * 1.196 * 1000000;
                updated.squarefoot = val * 1.076 * 10000000;
                updated.squareinch = val * 1.55 * 1000000000;
                updated.hectare = val * 100;
                updated.acre = val * 247.105;
                break;

            case "squaremeter":
                updated.squarekilometer = val / 1000000;
                updated.squaremile = val * 3.861e-7;
                updated.squareyard = val * 1.19599;
                updated.squarefoot = val * 10.7639;
                updated.squareinch = val * 1550;
                updated.hectare = val / 10000;
                updated.acre = val * 0.000247105;
                break;

            case "squaremile":
                updated.squarekilometer = val * 2.58999;
                updated.squaremeter = val * 2.59 * 1000000;
                updated.squareyard = val * 3.098 * 1000000;
                updated.squarefoot = val * 2.788 * 10000000;
                updated.squareinch = val * 4.014 * 1000000000;
                updated.hectare = val * 258.999;
                updated.acre = val * 640;
                break;

            case "squareyard":
                updated.squarekilometer = val * 8.3613e-8;
                updated.squaremeter = val * 0.836127;
                updated.squaremile = val * 3.2283e-7;
                updated.squarefoot = val * 9;
                updated.squareinch = val * 1296;
                updated.hectare = val * 8.3613e-5;
                updated.acre = val * 0.000206612;
                break;

            case "squarefoot":
                updated.squarekilometer = val * 9.2903e-8;
                updated.squaremeter = val * 0.092903;
                updated.squaremile = val * 3.587e-8;
                updated.squareyard = val * 0.111111;
                updated.squareinch = val * 144;
                updated.hectare = val * 9.2903e-6;
                updated.acre = val * 2.2957e-5;
                break;

            case "squareinch":
                updated.squarekilometer = val * 6.4516e-10;
                updated.squaremeter = val * 0.00064516;
                updated.squaremile = val * 2.491e-10;
                updated.squareyard = val * 0.000771605;
                updated.squarefoot = val * 0.00694444;
                updated.hectare = val * 6.4516e-8;
                updated.acre = val * 1.5942e-7;
                break;

            case "hectare":
                updated.squarekilometer = val * 0.01;
                updated.squaremeter = val * 10000;
                updated.squaremile = val * 0.00386102;
                updated.squareyard = val * 11959.9;
                updated.squarefoot = val * 107639;
                updated.squareinch = val * 1.55e7;
                updated.acre = val * 2.47105;
                break;

            case "acre":
                updated.squarekilometer = val * 0.00404686;
                updated.squaremeter = val * 4046.86;
                updated.squaremile = val * 0.0015625;
                updated.squareyard = val * 4840;
                updated.squarefoot = val * 43560;
                updated.squareinch = val * 6.273e6;
                updated.hectare = val * 0.404686;
                break;

            default:
                break;
        }

        setValues(updated);
    };

    return (
        <Container>
            Enter value in any of the input boxes below:
            <br />
            {unitList.map((unit) => (
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

export default AreaConverter;
