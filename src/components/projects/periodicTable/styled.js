import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 20px;
    overflow-x: auto;
    background: #111;
    color: #fff;
    min-height: 100vh;
`;

export const TableGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(18, 60px);
    grid-template-rows: repeat(10, 60px);
    gap: 4px;
    margin: 20px 0;
`;

export const Box = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    border-radius: 4px;
    background: #222;
    border: 1px solid #444;
    cursor: pointer;
    padding: 5px;
    text-align: center;
    transition: 0.3s;

    &.alkali {
        background-color: #31708e;
    }
    &.alkaline {
        background-color: #3c763d;
    }
    &.transition {
        background-color: #7a4b94;
    }
    &.post-transition {
        background-color: #d58512;
    }
    &.metalloids {
        background-color: #a94442;
    }
    &.nonmetals {
        background-color: #337ab7;
    }
    &.noble {
        background-color: #5bc0de;
    }
    &.lanthanides {
        background-color: #31b0d5;
    }
    &.actinides {
        background-color: #8a6d3b;
    }

    &:hover {
        transform: scale(1.1);
        z-index: 1;
    }
`;

export const GroupLegend = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;

    div {
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 14px;
        color: #fff;
    }

    .alkali {
        background-color: #31708e;
    }
    .alkaline {
        background-color: #3c763d;
    }
    .transition {
        background-color: #7a4b94;
    }
    .post-transition {
        background-color: #d58512;
    }
    .metalloids {
        background-color: #a94442;
    }
    .nonmetals {
        background-color: #337ab7;
    }
    .noble {
        background-color: #5bc0de;
    }
    .lanthanides {
        background-color: #31b0d5;
    }
    .actinides {
        background-color: #8a6d3b;
    }
`;
