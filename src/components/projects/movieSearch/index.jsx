import React, { useState } from "react";
import styled from "styled-components";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import MovieCard from "./MovieCard";

const Container = styled.div`
    padding: 30px;
    background-color: #fff;
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
    margin-bottom: 40px;
`;

const OutputContainer = styled.div``;

const MoviesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const MovieSearch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [movies, setMovies] = useState(null);

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (searchInput.trim().length < 3) {
            return toast.warn("Search term is less than 3 characters");
        }

        try {
            setIsLoading(true);
            setMovies(null);
            const response = await axios(`https://api.tvmaze.com/search/shows?q=${searchInput}`);

            if (response?.data?.length > 0) {
                const transformedMovies = response.data.map(item => ({
                    Title: item.show.name,
                    Year: item.show.premiered ? item.show.premiered.substring(0, 4) : 'N/A',
                    imdbID: item.show.externals?.imdb || 'N/A',
                    Type: item.show.type,
                    Poster: item.show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Poster',
                    Summary: item.show.summary,
                    Genres: item.show.genres,
                    Rating: item.show.rating?.average,
                    Status: item.show.status
                }));
                setMovies(transformedMovies);
            } else {
                toast.error("No shows found");
            }
        } catch (error) {
            toast.error(error?.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Main>
                <Heading>Movie Search App</Heading>
                <Form onSubmit={handleSubmit}>
                    <TextField
                        value={searchInput}
                        onChange={handleSearchInput}
                        label="Search movie here"
                        placeholder="Search movie here"
                        fullWidth
                    />
                    <Button
                        type="submit"
                        disabled={isLoading}
                        variant="contained"
                    >
                        {isLoading ? <CircularProgress /> : "Submit"}
                    </Button>
                </Form>

                <OutputContainer>
                    <MoviesContainer>
                        {isLoading ? (
                            <CircularProgress sx={{ marginLeft: "50%" }} />
                        ) : (
                            movies &&
                            movies.map((movie, index) => (
                                <MovieCard key={index} {...movie} />
                            ))
                        )}
                    </MoviesContainer>
                </OutputContainer>
            </Main>
        </Container>
    );
};

export default MovieSearch;
