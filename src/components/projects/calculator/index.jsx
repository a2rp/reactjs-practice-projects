import React, { useState, useEffect } from "react";
import { Styled } from "./styled";

const buttons = [
    { label: "(", type: "op" },
    { label: ")", type: "op" },
    { label: "C", type: "func" },
    { label: "⌫", type: "func" },
    { label: "sin", type: "func" },
    { label: "cos", type: "func" },
    { label: "tan", type: "func" },
    { label: "log", type: "func" },
    { label: "7" },
    { label: "8" },
    { label: "9" },
    { label: "/", type: "op" },
    { label: "4" },
    { label: "5" },
    { label: "6" },
    { label: "*", type: "op" },
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "-", type: "op" },
    { label: "0" },
    { label: ".", type: "op" },
    { label: "√", type: "func" },
    { label: "+", type: "op" },
    { label: "π", type: "func" },
    { label: "^", type: "op" },
    { label: "=", type: "eq" },
];

const App = () => {
    const [input, setInput] = useState("");

    const insert = (value) => {
        const update = (text) => setInput((prev) => prev + text);

        switch (value) {
            case "C":
                return setInput("");
            case "⌫":
                return setInput((prev) => prev.slice(0, -1));
            case "=":
                return evaluate();
            case "π":
                return update(Math.PI.toFixed(8));
            case "√":
                return update("Math.sqrt(");
            case "^":
                return update("**");
            case "sin":
            case "cos":
            case "tan":
                return update(`Math.${value}(`);
            case "log":
                return update("Math.log10(");
            default:
                return update(value);
        }
    };

    const evaluate = () => {
        try {
            const result = Function('"use strict";return (' + input + ")")();
            setInput(result.toString());
        } catch {
            setInput("Error");
        }
    };

    const handleKeyDown = (e) => {
        const key = e.key;
        if (
            /[0-9+\-*/().]/.test(key) ||
            key === "Enter" ||
            key === "Backspace" ||
            key === "Delete"
        ) {
            e.preventDefault();
            if (key === "Enter") return evaluate();
            if (key === "Backspace") return insert("⌫");
            if (key === "Delete") return insert("C");
            insert(key);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <Styled.Wrapper>
            <Styled.Main>
                <Styled.Heading>Calculator</Styled.Heading>
                <Styled.ControlsSection>
                    <Styled.Display>{input || "0"}</Styled.Display>
                    <Styled.ButtonGrid>
                        {buttons.map(({ label, type }, i) => (
                            <Styled.CalcButton
                                key={i}
                                onClick={() => insert(label)}
                                data-func={type === "func"}
                                data-op={type === "op"}
                                data-eq={type === "eq"}
                            >
                                {label}
                            </Styled.CalcButton>
                        ))}
                    </Styled.ButtonGrid>
                </Styled.ControlsSection>
            </Styled.Main>
        </Styled.Wrapper>
    );
};

export default App;
