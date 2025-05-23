import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Box,
    Button,
    CircularProgress,
    TextField,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

// Styled Components
const Container = styled.div`
    padding: 30px;
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    color: #000;
`;

const Heading = styled.h3`
    text-align: center;
    margin-bottom: 30px;
`;

const Section = styled(FormControl)`
    margin-bottom: 20px;
    width: 100%;
`;

const StyledTextField = styled(TextField)`
    margin-top: 20px !important;
    margin-bottom: 20px !important;
`;

const SubmitButton = styled(Button)`
    margin-top: 10px !important;
`;

const OutputBox = styled.div`
    background-color: #000;
    color: #fff;
    padding: 15px;
    margin-top: 30px;
    white-space: pre-wrap;
`;

const JokesGenerator = () => {
    const [category, setCategory] = useState("Any");
    const [language, setLanguage] = useState("en");
    const [flags, setFlags] = useState("none");
    const [responseFormat, setResponseFormat] = useState("json");
    const [searchString, setSearchString] = useState("morning");
    const [numberOfJokes, setNumberOfJokes] = useState(1);
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        setOutput("");

        let url = `https://v2.jokeapi.dev/joke/${category}`;

        if (flags && flags !== "none") {
            url += `?blacklistFlags=${flags}`;
        }

        const hasParams = url.includes("?");

        if (language !== "en") {
            url += `${hasParams ? "&" : "?"}lang=${language}`;
        }

        if (searchString.trim()) {
            url += `${url.includes("?") ? "&" : "?"}contains=${encodeURIComponent(searchString.trim())}`;
        }

        try {
            const response = await axios.get(url);
            if (response.data.error) {
                toast.error(response.data.message || "API Error");
                setError(response.data.message);
            } else {
                setOutput(response.data);
            }
        } catch (err) {
            toast.error(err.message);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Container>
            <Heading>Jokes Generator</Heading>

            <form onSubmit={handleSubmit}>
                <Section>
                    <label>Category</label>
                    <RadioGroup
                        row
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {[
                            "Any",
                            "Programming",
                            "Miscellaneous",
                            "Dark",
                            "Pun",
                            "Spooky",
                            "Christmas",
                        ].map((cat) => (
                            <FormControlLabel
                                key={cat}
                                value={cat}
                                control={<Radio />}
                                label={cat}
                            />
                        ))}
                    </RadioGroup>
                </Section>

                <Section>
                    <label>Language</label>
                    <RadioGroup
                        row
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        {[
                            { code: "cs", label: "czech" },
                            { code: "en", label: "english" },
                            { code: "fr", label: "french" },
                            { code: "de", label: "german" },
                            { code: "pt", label: "portuguese" },
                            { code: "es", label: "spanish" },
                        ].map(({ code, label }) => (
                            <FormControlLabel
                                key={code}
                                value={code}
                                control={<Radio />}
                                label={label}
                            />
                        ))}
                    </RadioGroup>
                </Section>

                <Section>
                    <label>Flags</label>
                    <RadioGroup
                        row
                        value={flags}
                        onChange={(e) => setFlags(e.target.value)}
                    >
                        {[
                            "none",
                            "nsfw",
                            "religious",
                            "political",
                            "racist",
                            "sexist",
                            "explicit",
                        ].map((flag) => (
                            <FormControlLabel
                                key={flag}
                                value={flag}
                                control={<Radio />}
                                label={flag}
                            />
                        ))}
                    </RadioGroup>
                </Section>

                <StyledTextField
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    fullWidth
                    label="Search string"
                    variant="outlined"
                />

                <SubmitButton
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : "Submit"}
                </SubmitButton>
            </form>

            {output && (
                <>
                    <OutputBox>{output.joke}</OutputBox>
                    <pre>{JSON.stringify(output, null, 2)}</pre>
                </>
            )}
        </Container>
    );
};

export default JokesGenerator;
