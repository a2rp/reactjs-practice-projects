import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    height: 100%;
    overflow: auto;
`;

export const Heading = styled.h1`
    text-align: center;
    padding: 15px;
`;

export const ContentWrapper = styled.div`
    border: 3px solid #000;
    border-radius: 3px;
    margin: 15px;
    padding: 15px;
    height: calc(100% - 120px);
    display: flex;
    flex-direction: column;
`;

export const TextareaContainer = styled.div`
    border: 1px solid #000;
    height: calc(50% - 15px);
    padding: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const RadioControls = styled.div`
    display: flex;
    gap: 15px;
    font-size: 14px;

    label {
        display: flex;
        align-items: center;
        gap: 5px;
    }
`;

export const TextArea = styled.textarea`
    resize: none;
    padding: 10px;
    width: 100%;
    font-family: Consolas, monospace;
    font-size: 12px;
    border: 1px solid #ccc;
    height: 300px;
`;

export const OutputBox = styled.pre`
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    overflow: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: Consolas, monospace;
    font-size: 12px;
    /* background: #f4f4f4; */
`;

export const InputOutputWrapper = styled.div``;

export const OutputHeading = styled.h1`
    margin-top: 15px;
`;
