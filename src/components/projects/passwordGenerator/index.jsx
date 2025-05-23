// PasswordGenerator.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    height: 100%;
    overflow: auto;
`;

const Heading = styled.h1`
    text-align: center;
    margin: 30px;
`;

const Fieldset = styled.fieldset`
    margin-bottom: 20px;
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    padding: 15px;

    legend {
        padding: 5px;;
    }

    span {
        display: flex;
        gap: 5px;
    }
`;

const GenerateButton = styled.div`
    padding: 15px 30px;;
    width: 100%;
    text-align: center;
    border-radius: 3px;
    background-color: #123456;
    color: #fff;
    cursor: pointer;
`;

const GeneratedPassword = styled.div`
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #333;
    color: #fff;
    font-size: 50px;
    margin: 10px 0;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;

    &:hover {
        background-color: #444;
    }

    &::after {
        content: "Click to copy";
        position: absolute;
        bottom: -50%;
        left: 0;
        right: 0;
        font-size: 12px;
        color: #aaa;
        opacity: 0;
        transition: opacity 0.2s;
    }

    &:hover::after {
        opacity: 1;
    }
`;

const CopiedNotification = styled.div`
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    z-index: 1000;
    animation: fadeInOut 2s ease-in-out;

    @keyframes fadeInOut {
        0% { opacity: 0; }
        20% { opacity: 1; }
        80% { opacity: 1; }
        100% { opacity: 0; }
    }
`;

const PasswordGenerator = () => {
    const [length, setLength] = useState(4);
    const [includeLower, setIncludeLower] = useState(true);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        let validChars = "";
        if (includeLower) validChars += "abcdefghijklmnopqrstuvwxyz";
        if (includeUpper) validChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeNumbers) validChars += "1234567890";
        if (includeSymbols) validChars += "~!@#$%^&*()_";

        if (!validChars) {
            setError("Character list not selected.");
            setPassword("");
            return;
        }

        let generated = "";
        for (let i = 0; i < length; i++) {
            const rand = Math.floor(Math.random() * validChars.length);
            generated += validChars[rand];
        }
        setPassword(generated);
        setError("");
    };

    const handleCopyPassword = () => {
        if (!password || error) return;

        navigator.clipboard.writeText(password)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                toast.info("Copied");
            })
            .catch(err => {
                setError("Failed to copy password");
            });
    };

    return (
        <Container>
            <Heading>Password Generator</Heading>

            <Fieldset>
                <legend>Select password length</legend>
                {[...Array(17)].map((_, i) => {
                    const val = i + 4;
                    return (
                        <span key={val}>
                            <input
                                type="radio"
                                name="length"
                                value={val}
                                checked={length === val}
                                onChange={() => setLength(val)}
                            />
                            {val}
                        </span>
                    );
                })}
            </Fieldset>

            <Fieldset>
                <legend>Characters to include</legend>
                <span>
                    <input
                        type="checkbox"
                        checked={includeLower}
                        onChange={() => setIncludeLower(!includeLower)}
                    />
                    <label>a to z</label>
                </span>
                <span>
                    <input
                        type="checkbox"
                        checked={includeUpper}
                        onChange={() => setIncludeUpper(!includeUpper)}
                    />
                    <label>A to Z</label>
                </span>
                <span>
                    <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={() => setIncludeNumbers(!includeNumbers)}
                    />
                    <label>0 to 9</label>
                </span>
                <span>
                    <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={() => setIncludeSymbols(!includeSymbols)}
                    />
                    <label>~!@#$%^&*()_</label>
                </span>
            </Fieldset>

            <GenerateButton onClick={handleGenerate}>
                Click here to generate password
            </GenerateButton>

            {password.length > 0 && (
                <GeneratedPassword
                    onClick={handleCopyPassword}
                    style={{ color: error ? "#f00" : "#fff" }}
                >
                    {error || password}
                </GeneratedPassword>
            )}

            {copied && <CopiedNotification>Password copied to clipboard!</CopiedNotification>}
        </Container>
    );
};

export default PasswordGenerator;