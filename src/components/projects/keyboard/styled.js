// components/keyboard/styled.js
import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    /* height: 100%; */
    overflow: auto;
    background-color: #eee;
`;

export const AbsoluteContainer = styled.div`
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 720px;
    height: 430px;
    background-color: #aaa;
    overflow: hidden;
    border: 3px solid #000;
    border-radius: 5px;
`;

export const RelativeContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export const TextArea = styled.textarea`
    padding: 0 10px;
    margin: 0;
    border: none;
    width: calc(100% - 20px);
    height: 120px;
    resize: none;
`;

export const ControlsContainer = styled.div`
    height: 30px;
    line-height: 30px;
    background-color: #ddd;
`;

export const KeysContainer = styled.div`
    background-color: #ddd;
    margin-top: 2px;
    width: 100%;
    height: 240px;
    border-radius: 3px;
    overflow: hidden;
`;

export const Key = styled.div`
    position: relative;
    float: left;
    margin: 4px;
    height: 40px;
    background-color: #fff;
    color: #000;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 3px;
    cursor: pointer;
    width: 40px;

    &.nonchar {
        background-color: #aaa;
    }

    &.active {
        background-color: #222;
        color: #fff;
    }

    &.wide-64 {
        width: 64px;
    }
    &.wide-80 {
        width: 80px;
    }
    &.wide-96 {
        width: 96px;
    }
    &.wide-112 {
        width: 112px;
    }
    &.wide-375 {
        width: 375px;
    }
    &.wide-50 {
        width: 50px;
    }
`;

export const FirstChar = styled.div`
    position: absolute;
    font-size: 10px;
    top: 0;
    left: 3px;
`;

export const SecondChar = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
`;
