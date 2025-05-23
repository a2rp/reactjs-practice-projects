import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
    Button,
    IconButton,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import QrScanner from "qr-scanner";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Container = styled.div``;

const Title = styled.h3`
    margin-bottom: 10px;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ImageBox = styled.div`
    margin-top: 15px;
`;

const QRImage = styled.img`
    max-width: 300px;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ImageScanner = () => {
    const qrTextRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [qrText, setQrText] = useState("QR Code value");
    const [copyTitle, setCopyTitle] = useState("Copy text");
    const [disableGet, setDisableGet] = useState(true);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || undefined);
    };

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        setDisableGet(false);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const getQrCode = async () => {
        try {
            const result = await QrScanner.scanImage(selectedFile);
            setQrText(result);
            qrTextRef.current.value = result;
        } catch (error) {
            toast.warn("Failed to decode QR code");
        }
    };

    const copyText = () => {
        navigator.clipboard.writeText(qrText);
        setCopyTitle("Text copied");
        setTimeout(() => setCopyTitle("Copy text"), 3000);
    };

    return (
        <Container>
            <Title>Image Scanner</Title>
            <Main>
                <Button variant="contained" component="label" fullWidth>
                    Select image file
                    <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>

                <ImageBox>
                    {selectedFile && <QRImage src={preview} alt="QR preview" />}
                </ImageBox>

                <Details>
                    <Button
                        variant="contained"
                        onClick={getQrCode}
                        disabled={disableGet}
                    >
                        Get
                    </Button>
                    <TextField
                        ref={qrTextRef}
                        fullWidth
                        label="Scanned value"
                        placeholder="Scanned value"
                        value={qrText}
                    />
                    <Tooltip title={copyTitle}>
                        <IconButton onClick={copyText}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Tooltip>
                </Details>
            </Main>
        </Container>
    );
};

export default ImageScanner;
