import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";

// Styled Components
const Container = styled.div`
    background-color: #fff;
    color: #000;
    padding: 30px;
    max-width: 900px;
    margin: auto;
`;

const Main = styled.div`
    max-width: 600px;
    margin: auto;
`;

const Heading = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const Form = styled.form`
    text-align: center;
    margin-bottom: 30px;
`;

const QuotesBox = styled.div`
    max-height: 300px;
    overflow-y: auto;
    padding: 20px;
    background: #f4f4f4;
    border-radius: 10px;
    border: 1px solid #ccc;
`;

const ListItem = styled.li`
    margin-bottom: 15px;
    font-style: italic;
`;

const RandomQuotes = () => {
    const quotesRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [quotes, setQuotes] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            setTimeout(async () => {
                const response = await axios.get(
                    "https://api.adviceslip.com/advice"
                );
                const quote = response.data.slip.advice;
                setQuotes((prev) => [...prev, quote]);
                setIsLoading(false);

                setTimeout(() => {
                    if (quotesRef.current) {
                        quotesRef.current.scrollTop =
                            quotesRef.current.scrollHeight;
                    }
                }, 100);
            }, 2000);
        } catch (error) {
            setIsLoading(false);
            console.error("Quote fetch error:", error);
        }
    };

    return (
        <Container>
            <Main>
                <Heading>Random Quotes</Heading>
                <Form onSubmit={handleSubmit}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} />
                        ) : (
                            "Fetch Quote"
                        )}
                    </Button>
                </Form>

                <QuotesBox ref={quotesRef}>
                    <ol>
                        {quotes.map((item, index) => (
                            <ListItem key={index}>{item}</ListItem>
                        ))}
                    </ol>
                </QuotesBox>
            </Main>
        </Container>
    );
};

export default RandomQuotes;
