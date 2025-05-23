import React, { useEffect, useState } from "react";
import {
    Container,
    ContentWrapper,
    TextareaContainer,
    RadioControls,
    TextArea,
    OutputBox,
    Heading,
    InputOutputWrapper,
    OutputHeading,
} from "./styled";

const levels = {
    level1: "4 8 c d 3 f 9 h 1 j k 1 m n 0 p q 2 5 7 u v w x y 2".split(" "),
    level2: "4 8 ( [) 3 |= 9 |-| 1 _| X 1 |/| |V 0 |* (_,) 2 5 7 (_) / // >< 7 2".split(
        " "
    ),
    level3: "/-\\ |3 ( |) [- |= (_+ # ! _| |< |_ /\\/\\ |\\| [] |> (_,) /2 $ '|' |_| |/ \\/\\/ >< `/ 7_".split(
        " "
    ),
};

const original = "abcdefghijklmnopqrstuvwxyz".split("");

const LeetSpeak = () => {
    const [text, setText] = useState("");
    const [level, setLevel] = useState("level1");

    const convertText = (input) => {
        return input
            .split("")
            .map((char) => {
                const idx = original.indexOf(char.toLowerCase());
                if (idx === -1) return char;
                return levels[level][idx] || char;
            })
            .join("");
    };

    useEffect(() => {
        // console.log(text.trim().length, "trim");
    }, [text]);

    return (
        <Container>
            <Heading>Leet Speak</Heading>

            <ContentWrapper>
                <TextareaContainer>
                    <RadioControls>
                        <label>
                            <input
                                type="radio"
                                name="level"
                                value="level1"
                                checked={level === "level1"}
                                onChange={() => setLevel("level1")}
                            />
                            Level 1
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="level"
                                value="level2"
                                checked={level === "level2"}
                                onChange={() => setLevel("level2")}
                            />
                            Level 2
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="level"
                                value="level3"
                                checked={level === "level3"}
                                onChange={() => setLevel("level3")}
                            />
                            Level 3
                        </label>
                    </RadioControls>

                    <InputOutputWrapper>
                        <TextArea
                            placeholder="write here something..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        {text.trim().length > 0 && <>
                            <OutputHeading>LEET Output: </OutputHeading>
                            <OutputBox>{convertText(text)}</OutputBox>
                        </>}
                    </InputOutputWrapper>
                </TextareaContainer>
            </ContentWrapper>
        </Container>
    );
};

export default LeetSpeak;
