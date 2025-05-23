import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

const Container = styled.div`
    padding: 30px;
    max-width: 800px;
    margin: auto;
    text-align: center;
`;

const Title = styled.h3`
    margin-bottom: 15px;
`;

const ClickCount = styled.h3`
    color: #888;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
`;

const StyledButton = styled(Button)`
    display: flex !important;
    flex-direction: column;
    align-items: center;
    width: 120px;
    height: 100px;
`;

const Icon = styled.div`
    font-size: 32px;
`;

const Text = styled.div`
    margin-top: 10px;
`;

const ScoreContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
`;

const ScoreArea = styled.div`
    border: 1px solid #ccc;
    padding: 15px;
    width: 45%;
    border-radius: 10px;
    background: #f5f5f5;
`;

const ResetContainer = styled.div`
    margin-top: 30px;
`;

const RulesContainer = styled.div`
    margin-top: 40px;
`;

const RulesHeading = styled.h3`
    margin-bottom: 10px;
`;

const Rules = styled.div`
    line-height: 1.6;
`;

const RockPaperScissor = () => {
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [playerChoice, setPlayerChoice] = useState("null");
    const [computerChoice, setComputerChoice] = useState("null");
    const [clickCount, setClickCount] = useState(0);

    const handleClick = (value) => {
        setClickCount(clickCount + 1);
        const choicesArray = ["rock", "paper", "scissor"];
        const playerChoice = value;
        const computerChoice =
            choicesArray[Math.floor(Math.random() * choicesArray.length)];

        setPlayerChoice(playerChoice);
        setComputerChoice(computerChoice);

        if (playerChoice === computerChoice) {
            return;
        } else if (
            (playerChoice === "rock" && computerChoice === "scissor") ||
            (playerChoice === "scissor" && computerChoice === "paper") ||
            (playerChoice === "paper" && computerChoice === "rock")
        ) {
            setPlayerScore((prev) => prev + 1);
        } else {
            setComputerScore((prev) => prev + 1);
        }
    };

    const resetGame = () => {
        setPlayerChoice("null");
        setComputerChoice("null");
        setPlayerScore(0);
        setComputerScore(0);
        setClickCount(0);
    };

    return (
        <Container>
            <Title>Rock-Paper-Scissor</Title>
            <ClickCount>Total {clickCount} clicks</ClickCount>

            <ButtonsContainer>
                <StyledButton
                    variant="contained"
                    onClick={() => handleClick("rock")}
                >
                    <Icon>
                        <FaHandRock />
                    </Icon>
                    <Text>Rock</Text>
                </StyledButton>

                <StyledButton
                    variant="contained"
                    onClick={() => handleClick("paper")}
                >
                    <Icon>
                        <FaHandPaper />
                    </Icon>
                    <Text>Paper</Text>
                </StyledButton>

                <StyledButton
                    variant="contained"
                    onClick={() => handleClick("scissor")}
                >
                    <Icon>
                        <FaHandScissors />
                    </Icon>
                    <Text>Scissor</Text>
                </StyledButton>
            </ButtonsContainer>

            <ScoreContainer>
                <ScoreArea>
                    <Title>Player</Title>
                    <h4>Choice: {playerChoice}</h4>
                    <h4>Score: {playerScore}</h4>
                </ScoreArea>

                <ScoreArea>
                    <Title>Computer</Title>
                    <h4>Choice: {computerChoice}</h4>
                    <h4>Score: {computerScore}</h4>
                </ScoreArea>
            </ScoreContainer>

            <ResetContainer>
                <Button variant="contained" onClick={resetGame}>
                    Reset
                </Button>
            </ResetContainer>

            <RulesContainer>
                <RulesHeading>Rules</RulesHeading>
                <Rules>
                    <h4>In rock & scissor: rock wins +1</h4>
                    <h4>In scissor & paper: scissor wins +1</h4>
                    <h4>In paper & rock: paper wins +1</h4>
                </Rules>
            </RulesContainer>
        </Container>
    );
};

export default RockPaperScissor;
