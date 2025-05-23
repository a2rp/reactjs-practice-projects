import React, { useState } from "react";
import QNASection from "./QNASection";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
    background-color: #fff;
    color: #000;
    padding: 30px;
    max-width: 900px;
    margin: auto;
`;

const Heading = styled.h3`
    text-align: center;
    margin-bottom: 30px;
`;

const QuestionArea = styled.div`
    margin-top: 20px;
`;

const QuizApp = () => {
    const [displayQuestion, setDisplayQuestion] = useState(1);

    return (
        <Container>
            <Heading>Quiz Application</Heading>
            <QuestionArea>
                {displayQuestion === 1 && (
                    <QNASection
                        displayQuestion={displayQuestion}
                        setDisplayQuestion={setDisplayQuestion}
                        srno={1}
                        question={"What is 1+1?"}
                        answers={[1, 2, 3, 4]}
                        correctAnswerIndex={1}
                    />
                )}
                {displayQuestion === 2 && (
                    <QNASection
                        displayQuestion={displayQuestion}
                        setDisplayQuestion={setDisplayQuestion}
                        srno={2}
                        question={"What is 2+5?"}
                        answers={[67, 43, 7, -3]}
                        correctAnswerIndex={2}
                    />
                )}
                {displayQuestion === 3 && (
                    <QNASection
                        displayQuestion={displayQuestion}
                        setDisplayQuestion={setDisplayQuestion}
                        srno={3}
                        question={"What is English of 5?"}
                        answers={["one", "three", "five", "seven"]}
                        correctAnswerIndex={2}
                    />
                )}
                {displayQuestion === 4 && (
                    <QNASection
                        displayQuestion={displayQuestion}
                        setDisplayQuestion={setDisplayQuestion}
                        srno={4}
                        question={"How many days in a week?"}
                        answers={["One", "Three", "Five", "Seven"]}
                        correctAnswerIndex={3}
                    />
                )}
                {displayQuestion === 5 && (
                    <QNASection
                        displayQuestion={displayQuestion}
                        setDisplayQuestion={setDisplayQuestion}
                        srno={5}
                        question={"How many months in one year?"}
                        answers={["Ten", "Eleven", "Twelve", "Thirteen"]}
                        correctAnswerIndex={2}
                    />
                )}
            </QuestionArea>
        </Container>
    );
};

export default QuizApp;
