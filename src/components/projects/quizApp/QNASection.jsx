import React, { useEffect, useState } from "react";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import styled from "styled-components";

// Styled Components
const QuestionContainer = styled.div`
    margin-bottom: 30px;
`;

const NavigationButtons = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
`;

const QNASection = ({
    displayQuestion,
    setDisplayQuestion,
    srno,
    question,
    answers,
    correctAnswerIndex,
}) => {
    const [selectedValue, setSelectedValue] = useState(-1);
    const [correctIncorrectText, setCorrectIncorrectText] =
        useState("Incorrect");

    useEffect(() => {
        // console.log(
        //     parseInt(selectedValue),
        //     correctAnswerIndex,
        //     "selectedValue"
        // );
    }, [selectedValue]);

    return (
        <QuestionContainer>
            <FormControl>
                <FormLabel>
                    Question {srno}/5:
                    <h3>{question}</h3>
                    <h4>Selected answer: {correctIncorrectText}</h4>
                </FormLabel>
                <RadioGroup
                    value={selectedValue}
                    onChange={(event) => {
                        const selected = parseInt(event.target.value);
                        setSelectedValue(selected);
                        setCorrectIncorrectText(
                            selected === correctAnswerIndex
                                ? "Correct"
                                : "Incorrect"
                        );
                    }}
                >
                    {answers.map((answer, index) => (
                        <FormControlLabel
                            key={index}
                            value={index}
                            control={<Radio />}
                            label={answer}
                        />
                    ))}
                </RadioGroup>
            </FormControl>

            <NavigationButtons>
                <Button
                    variant="contained"
                    onClick={() => setDisplayQuestion(displayQuestion - 1)}
                    disabled={srno === 1}
                >
                    Prev question
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setDisplayQuestion(displayQuestion + 1)}
                    disabled={srno === 5}
                >
                    {srno === 5 ? "Restart exam" : "Next question"}
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setDisplayQuestion(1)}
                    disabled={srno !== 5}
                >
                    Restart
                </Button>
            </NavigationButtons>
        </QuestionContainer>
    );
};

export default QNASection;
