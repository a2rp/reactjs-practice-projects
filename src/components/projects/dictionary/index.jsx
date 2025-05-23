import React, { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const Dictionary = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [data, setData] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const options = {
                url: `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`,
                method: "get",
            };
            const response = await axios(options);
            setData(response.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Main>
                <Heading>Dictionary</Heading>

                <Form onSubmit={handleSubmit}>
                    <TextField
                        value={searchWord}
                        onChange={(event) => setSearchWord(event.target.value)}
                        fullWidth
                        required
                        label="Search word here"
                        placeholder="Search word here"
                    />
                    <StyledButton
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <CircularProgress sx={{ padding: "10px" }} />
                        ) : (
                            "Search"
                        )}
                    </StyledButton>
                </Form>

                <OutputContainer>
                    {data.map((word, index) => (
                        <WordContainer key={index}>
                            <TheWord>{word.word}</TheWord>
                            <MeaningsContainer>
                                {word.meanings.map((meaning, idx) => (
                                    <Meaning key={idx}>
                                        <PartOfSpeech>
                                            <PartOfSpeechHeading>
                                                Part of speech
                                            </PartOfSpeechHeading>
                                            &nbsp;{meaning.partOfSpeech}
                                        </PartOfSpeech>
                                        {meaning.synonyms.length > 0 && (
                                            <Synonyms>
                                                <SynonymsHeading>
                                                    Synonyms:
                                                </SynonymsHeading>
                                                {meaning.synonyms.map(
                                                    (synonym, i) => (
                                                        <Synonym key={i}>
                                                            {synonym}
                                                        </Synonym>
                                                    )
                                                )}
                                            </Synonyms>
                                        )}
                                        {meaning.antonyms.length > 0 && (
                                            <Antonyms>
                                                <AntonymsHeading>
                                                    Antonyms:
                                                </AntonymsHeading>
                                                {meaning.antonyms.map(
                                                    (antonym, i) => (
                                                        <Antonym key={i}>
                                                            {antonym}
                                                        </Antonym>
                                                    )
                                                )}
                                            </Antonyms>
                                        )}
                                        <Definitions>
                                            <DefinitionHeading>
                                                Definition:
                                            </DefinitionHeading>
                                            {meaning.definitions.map(
                                                (item, i) => (
                                                    <DefinitionExample key={i}>
                                                        <Definition>
                                                            {item.definition}
                                                        </Definition>
                                                        {item.example && (
                                                            <Example>
                                                                e.g.{" "}
                                                                {item.example}
                                                            </Example>
                                                        )}
                                                    </DefinitionExample>
                                                )
                                            )}
                                        </Definitions>
                                    </Meaning>
                                ))}
                            </MeaningsContainer>
                        </WordContainer>
                    ))}
                </OutputContainer>
            </Main>
        </Container>
    );
};

export default Dictionary;

import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    background-color: #fff;
    color: #000;
    margin: 30px;
`;

export const Main = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

export const Heading = styled.div`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const StyledButton = styled(Button)`
    align-self: flex-start;
`;

export const OutputContainer = styled.div`
    margin-top: 30px;
`;

export const WordContainer = styled.div`
    margin-bottom: 40px;
`;

export const TheWord = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
`;

export const MeaningsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Meaning = styled.div`
    padding: 10px;
    background-color: #f8f8f8;
    border-left: 4px solid #1976d2;
    border-radius: 6px;
`;

export const PartOfSpeech = styled.div`
    font-weight: 500;
    margin-bottom: 10px;
`;

export const PartOfSpeechHeading = styled.span`
    font-weight: bold;
    color: #555;
`;

export const Synonyms = styled.div`
    margin-bottom: 10px;
`;

export const SynonymsHeading = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

export const Synonym = styled.span`
    display: inline-block;
    background: #e0f7fa;
    color: #00796b;
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: 6px;
    margin-bottom: 6px;
`;

export const Antonyms = styled.div`
    margin-bottom: 10px;
`;

export const AntonymsHeading = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

export const Antonym = styled.span`
    display: inline-block;
    background: #ffebee;
    color: #c62828;
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: 6px;
    margin-bottom: 6px;
`;

export const Definitions = styled.div`
    margin-top: 10px;
`;

export const DefinitionHeading = styled.div`
    font-weight: bold;
    margin-bottom: 8px;
`;

export const DefinitionExample = styled.div`
    margin-bottom: 10px;
`;

export const Definition = styled.div`
    font-style: italic;
`;

export const Example = styled.div`
    margin-top: 4px;
    color: #666;
    font-size: 0.9rem;
`;
