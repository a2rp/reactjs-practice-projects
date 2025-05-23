import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    height: 100%;
    overflow: auto;
`;

export const Breadcrumbs = styled.div`
    margin: 10px;
    padding: 10px;
    a:hover {
        text-decoration: none;
    }
`;

export const UpdateInfo = styled.b`
    display: inline-block;
    height: 20px;
    line-height: 20px;
    border: 2px solid #00f;
    color: #00f;
    padding: 0 20px;
`;

export const SvgInfo = styled.div`
    margin: 0 20px;
    height: 30px;
    line-height: 30px;
    background-color: #000;
    color: #fff;
    text-align: center;
`;

export const SvgWrapper = styled.div`
    display: inline-block;
    background-color: #00111a;
    width: calc(100% - 150px);
    height: calc(100% - 100px);
    margin: 0 20px;
    overflow: auto;
`;

export const ControlButton = styled.div`
    position: absolute;
    right: 20px;
    top: ${(props) => props.top || "150px"};
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    font-size: 10px;
    border-radius: 3px;
`;
