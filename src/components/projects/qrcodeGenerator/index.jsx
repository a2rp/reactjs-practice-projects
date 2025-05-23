import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button, CircularProgress, TextField } from "@mui/material";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Container = styled.div`
    background-color: #fff;
    color: #000;
    padding: 15px;
`;

const Title = styled.h3`
    margin-bottom: 10px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const QRImage = styled.img`
    max-width: 300px;
    margin-top: 20px;
`;

const DownloadSection = styled.div`
    margin-top: 20px;
`;

const Generator = () => {
    const qrCodeImageRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [qrCodeImage, setQrCodeImage] = useState(null);
    const [downloadDisabled, setDownloadDisabled] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inputValue.trim().length === 0)
            return toast.warn("Input value is empty");

        try {
            setIsLoading(true);
            const qrImageURL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${inputValue}`;
            setQrCodeImage(qrImageURL);
            setDownloadDisabled(false);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const downloadFile = async () => {
        try {
            const response = await axios.get(
                `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${inputValue}`,
                { responseType: "blob" }
            );
            const tempFile = URL.createObjectURL(response.data);
            const a = document.createElement("a");
            a.href = tempFile;
            a.download = "qrCode.png";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            toast.warn(error.message);
        }
    };

    return (
        <Container>
            <Title>QR Code Generator</Title>
            <Form onSubmit={handleSubmit}>
                <TextField
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    label="Enter text here"
                    placeholder="Enter text here"
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading || inputValue.trim().length === 0}
                >
                    {isLoading ? (
                        <CircularProgress sx={{ padding: "10px" }} />
                    ) : (
                        "Generate"
                    )}
                </Button>
            </Form>

            {qrCodeImage && (
                <QRImage ref={qrCodeImageRef} src={qrCodeImage} alt="QR Code" />
            )}

            <DownloadSection>
                <Button
                    variant="contained"
                    disabled={downloadDisabled}
                    onClick={downloadFile}
                    startIcon={<FaDownload />}
                >
                    Download
                </Button>
            </DownloadSection>
        </Container>
    );
};

export default Generator;
