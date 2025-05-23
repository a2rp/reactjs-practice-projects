import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import parse from "html-react-parser";

// Styled Components
const Container = styled.div`
    padding: 30px;
    background-color: #fff;
`;

const Main = styled.div`
    max-width: 700px;
    margin: 0 auto;
`;

const Heading = styled.h2`
    text-align: center;
    margin-bottom: 30px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;

    & > div {
        width: 100%;
    }
`;

const SubmitButton = styled(Button)`
    width: 200px;
    align-self: center;
`;

const LyricsContainer = styled.div`
    white-space: pre-wrap;
    background: #111;
    color: #eee;
    padding: 20px;
    border-radius: 8px;
    font-family: monospace;
    line-height: 1.6;
    font-size: 15px;
`;

const LyricsFinder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [artistName, setArtistName] = useState("linkin park");
    const [songTitle, setSongTitle] = useState("numb");
    const [lyrics, setLyrics] = useState(null);

    const searchLyrics = async () => {
        try {
            setIsLoading(true);
            setLyrics(null);
            const response = await axios(
                `https://api.lyrics.ovh/v1/${artistName}/${songTitle}`
            );
            setLyrics(response.data.lyrics);
            toast.success("Lyrics found");
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.error || "Lyrics not found");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        searchLyrics();
    };

    useEffect(() => {
        searchLyrics();
    }, []);

    return (
        <Container>
            <Main>
                <Heading>Lyrics Finder</Heading>
                <Form onSubmit={handleFormSubmit}>
                    <TextField
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        label="Artist name"
                        placeholder="Artist name"
                        required
                    />
                    <TextField
                        value={songTitle}
                        onChange={(e) => setSongTitle(e.target.value)}
                        label="Song title"
                        placeholder="Song title"
                        required
                    />
                    <SubmitButton
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} />
                        ) : (
                            "Find lyrics"
                        )}
                    </SubmitButton>
                </Form>

                {lyrics && <LyricsContainer>{parse(lyrics)}</LyricsContainer>}
                <ToastContainer position="top-right" autoClose={3000} />
            </Main>
        </Container>
    );
};

export default LyricsFinder;
