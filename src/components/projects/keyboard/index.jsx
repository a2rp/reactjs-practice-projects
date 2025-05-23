import React, { useRef, useState, useEffect } from "react";
import {
    Container,
    AbsoluteContainer,
    RelativeContainer,
    TextArea,
    ControlsContainer,
    KeysContainer,
    Key,
    FirstChar,
    SecondChar,
} from "./styled";
import { keyboardData } from "./keyboardData";

const Keyboard = () => {
    const [language, setLanguage] = useState("english");
    const [shift, setShift] = useState(false);
    const [capslock, setCapslock] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    const handleKeyClick = (first, second) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const isShiftKey = first.toLowerCase() === "shift";
        const isCaps = first.toLowerCase() === "capslock";
        const isBackspace = first.toLowerCase() === "backspace";
        const isEnter = first.toLowerCase() === "enter";
        const isTab = first.toLowerCase() === "tab";
        const isSpace = first === " ";
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        if (isShiftKey) return setShift((prev) => !prev);
        if (isCaps) return setCapslock((prev) => !prev);

        if (isBackspace) {
            textarea.value = value.slice(0, start - 1) + value.slice(end);
            textarea.setSelectionRange(start - 1, start - 1);
        } else if (isEnter) {
            textarea.value = value.slice(0, start) + "\n" + value.slice(end);
            textarea.setSelectionRange(start + 1, start + 1);
        } else if (isTab) {
            textarea.value = value.slice(0, start) + "\t" + value.slice(end);
            textarea.setSelectionRange(start + 1, start + 1);
        } else if (isSpace) {
            textarea.value = value.slice(0, start) + " " + value.slice(end);
            textarea.setSelectionRange(start + 1, start + 1);
        } else {
            let char = second;
            if (shift ^ capslock) char = second.toUpperCase();
            else char = second.toLowerCase();
            textarea.value = value.slice(0, start) + char + value.slice(end);
            textarea.setSelectionRange(start + 1, start + 1);
            setShift(false);
        }

        textarea.focus();
    };

    const getKeyWidth = (label) => {
        switch (label.toLowerCase()) {
            case "backspace":
            case "tab":
                return "64px";
            case "capslock":
                return "80px";
            case "enter":
                return "96px";
            case "shift":
                return "112px";
            case "ctrl":
            case "win":
            case "alt":
            case "₹":
                return "50px";
            case " ":
                return "375px";
            default:
                return "40px";
        }
    };

    return (
        <Container>
            <AbsoluteContainer>
                <RelativeContainer>
                    <TextArea
                        ref={textareaRef}
                        placeholder="...write here: select the language from the drop down list below"
                    />
                    <ControlsContainer>
                        <div style={{ padding: "0 10px" }}>
                            <b>Selected:</b> {language || "None"}
                        </div>
                    </ControlsContainer>

                    <KeysContainer>
                        {language &&
                            keyboardData[language].map((entry, idx) => {
                                const parts = entry.split(" ");
                                const first = parts[0];
                                const second = parts[1] || first;
                                const keyClassList = [];

                                // Mark nonchar keys
                                const noncharKeys = [
                                    "backspace",
                                    "tab",
                                    "enter",
                                    "capslock",
                                    "shift",
                                    "ctrl",
                                    "win",
                                    "alt",
                                ];
                                if (noncharKeys.includes(first.toLowerCase())) {
                                    keyClassList.push("nonchar");
                                }

                                // Active state (for shift/capslock)
                                if (
                                    (first.toLowerCase() === "shift" &&
                                        shift) ||
                                    (first.toLowerCase() === "capslock" &&
                                        capslock)
                                ) {
                                    keyClassList.push("active");
                                }

                                // Width based on key label
                                const lower = first.toLowerCase();
                                if (lower === "backspace" || lower === "tab")
                                    keyClassList.push("wide-64");
                                else if (lower === "capslock")
                                    keyClassList.push("wide-80");
                                else if (lower === "enter")
                                    keyClassList.push("wide-96");
                                else if (lower === "shift")
                                    keyClassList.push("wide-112");
                                else if (
                                    lower === "ctrl" ||
                                    lower === "win" ||
                                    lower === "alt" ||
                                    lower === "₹"
                                )
                                    keyClassList.push("wide-50");
                                else if (first === " ")
                                    keyClassList.push("wide-375");

                                return (
                                    <Key
                                        key={idx}
                                        className={keyClassList.join(" ")}
                                        onClick={() =>
                                            handleKeyClick(first, second)
                                        }
                                    >
                                        <FirstChar>
                                            {parts.length > 1 ? first : ""}
                                        </FirstChar>
                                        <SecondChar>{second}</SecondChar>
                                    </Key>
                                );
                            })}
                    </KeysContainer>

                    <div
                        style={{
                            display: "flex",
                            padding: "0 10px",
                            marginTop: "4px",
                        }}
                    >
                        <select
                            onChange={(e) => setLanguage(e.target.value)}
                            value={language}
                            style={{ flex: 1, marginRight: "8px" }}
                        >
                            <option value="" disabled>
                                Language Set 1
                            </option>
                            <option value="hindi">Hindi</option>
                        </select>
                        <select
                            onChange={(e) => setLanguage(e.target.value)}
                            value={language}
                            style={{ flex: 1 }}
                        >
                            <option value="" disabled>
                                Language Set 2
                            </option>
                            <option value="english">English</option>
                        </select>
                    </div>
                </RelativeContainer>
            </AbsoluteContainer>
        </Container>
    );
};

export default Keyboard;
