import React, { useState } from "react";
import styled from "styled-components";
import { Button, CircularProgress, TextField } from "@mui/material";
import { toast } from "react-toastify";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";

// Styled Components
const Container = styled.div`
    padding: 30px;
    background-color: #fff;
    color: #000;
`;

const Main = styled.div`
    max-width: 900px;
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

const TrailerContainer = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;

    .react-player {
        max-width: 100%;
        width: 640px;
        height: 360px;
        aspect-ratio: 16 / 9;
    }
`;

const MovieTrailer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [trailerName, setTrailerName] = useState("");
    const [trailerURL, setTrailerURL] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            setTrailerURL("");
            const response = await movieTrailer(trailerName);
            if (response == null) {
                toast.warn("Trailer not found");
            } else {
                setTrailerURL(response);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Main>
                <Heading>Movie Trailer</Heading>
                <Form onSubmit={handleSubmit}>
                    <TextField
                        value={trailerName}
                        onChange={(e) => setTrailerName(e.target.value)}
                        label="Search trailer"
                        placeholder="Trailer name"
                        required
                    />
                    <SubmitButton
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <CircularProgress sx={{ padding: "10px" }} />
                        ) : (
                            "Search trailer"
                        )}
                    </SubmitButton>
                </Form>

                {trailerURL && (
                    <TrailerContainer>
                        <ReactPlayer
                            url={trailerURL}
                            controls={true}
                            className="react-player"
                        />
                    </TrailerContainer>
                )}
            </Main>
        </Container>
    );
};

export default MovieTrailer;
