import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

// Styled Components
const Container = styled.div`
    padding: 30px;
    height: 100vh;
    overflow-y: scroll;
    scroll-behavior: smooth;
    position: relative;
    background-color: #fff;
    color: #000;
`;

const Main = styled.div`
    max-width: 800px;
    margin: auto;
`;

const Heading = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TopSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
    padding: 10px 0;
`;

const ScrollIndicatorSection = styled.div`
    position: relative;
    width: 100%;
    height: 35px;
    background: #eee;
    color: #000;
    border-radius: 5px;
    overflow: hidden;
`;

const ScrollToggle = styled.div`
    height: 100%;
    background-color: #1976d2;
    width: 0%;
    transition: width 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    span {
        color: #000;
        font-weight: bold;
        padding: 15px;
    }
`;

const Output = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const QuoteItem = styled.div`
    background: #f9f9f9;
    border-left: 5px solid #2196f3;
    padding: 15px;
    border-radius: 5px;
`;

const Author = styled.div`
    font-weight: bold;
`;

const Quote = styled.div`
    font-style: italic;
    margin-top: 5px;
`;

const ScrollProgressIndicator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [displayScroll, setDisplayScroll] = useState(0);
    const containerRef = React.useRef(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                "https://dummyjson.com/quotes?skip=0&limit=1000"
            );
            setData(response.data.quotes);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight;
            const clientHeight = container.clientHeight;

            const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
            setDisplayScroll(scrollPercent);
        };

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Container ref={containerRef}>
            <Main>
                <Heading>Scroll Progress Indicator</Heading>
                <Content>
                    <TopSection>
                        <h3>"Fetch Data" below and then scroll to see scroll progress indicator</h3>
                        <Button
                            variant="contained"
                            disabled={isLoading}
                            onClick={fetchData}
                            fullWidth
                        >
                            {isLoading ? (
                                <CircularProgress size={24} />
                            ) : (
                                "Fetch Data"
                            )}
                        </Button>

                        <ScrollIndicatorSection>
                            <ScrollToggle style={{ width: `${displayScroll}%` }}>
                                <span>{displayScroll.toFixed(2)}%</span>
                            </ScrollToggle>
                        </ScrollIndicatorSection>
                    </TopSection>

                    <Output>
                        {data.map((item) => (
                            <QuoteItem key={item.id}>
                                <Author>
                                    {item.id}. {item.author}
                                </Author>
                                <Quote>{item.quote}</Quote>
                            </QuoteItem>
                        ))}
                    </Output>
                </Content>
            </Main>
        </Container>
    );
};

export default ScrollProgressIndicator;