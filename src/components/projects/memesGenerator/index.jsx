import React, { useState } from "react";
import styled from "styled-components";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { toPng } from "html-to-image";
import { toast } from "react-toastify";

// Styled Components
const Container = styled.div`
  padding: 30px;
  background-color: #fff;
`;

const Main = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

const TopSection = styled.div`
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OutputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin-top: 20px;
`;

const MemeBox = styled.div`
  position: relative;
  width: 300px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const MemeOutputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const MemeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const MemeText = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 24px;
  font-family: impact, sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000,
    -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000,
    2px 2px 5px #000;
  padding: 10px 5px;
  word-wrap: break-word;
`;

const MemeTopText = styled(MemeText)`
  top: 10px;
`;

const MemeBottomText = styled(MemeText)`
  bottom: 10px;
`;

const SaveButton = styled(Button)`
  margin-top: 10px !important;
  background-color: #4caf50 !important;
  &:hover {
    background-color: #388e3c !important;
  }
`;

const MemesGenerator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [memes, setMemes] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            setMemes(null);
            const response = await axios.get("https://api.imgflip.com/get_memes");
            setMemes(response.data.data.memes);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const saveImage = (imageNumber) => {
        const node = document.querySelector(`.meme${imageNumber}`);
        if (!node) return;
        toPng(node, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "meme.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to save image");
            });
    };

    return (
        <Container>
            <Main>
                <TopSection>
                    <Heading>Memes Generator</Heading>
                    <Form onSubmit={handleSubmit}>
                        <TextField
                            value={topText}
                            onChange={(e) => setTopText(e.target.value)}
                            label="Top text"
                            placeholder="Write top text here"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            value={bottomText}
                            onChange={(e) => setBottomText(e.target.value)}
                            label="Bottom text"
                            placeholder="Write bottom text here"
                            fullWidth
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            variant="contained"
                            fullWidth
                            color="primary"
                            size="large"
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Get meme images"
                            )}
                        </Button>
                    </Form>
                </TopSection>

                <OutputContainer>
                    {memes &&
                        memes.slice(0, 10).map((item, index) => (
                            <MemeBox key={index} className={`meme${index}`}>
                                <MemeOutputWrapper>
                                    <MemeImage src={item.url} alt={item.name} />
                                    {topText && <MemeTopText>{topText}</MemeTopText>}
                                    {bottomText && <MemeBottomText>{bottomText}</MemeBottomText>}
                                </MemeOutputWrapper>
                                <SaveButton
                                    variant="contained"
                                    fullWidth
                                    onClick={() => saveImage(index)}
                                >
                                    Save
                                </SaveButton>
                            </MemeBox>
                        ))}
                </OutputContainer>
            </Main>
        </Container>
    );
};

export default MemesGenerator;