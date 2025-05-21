import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    height: 100vh;
`;

export const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background-color: #000;
    color: #fff;
    display: flex;
    align-items: center;
`;

export const Footer = styled.footer`
    height: 30px;
`;

export const Nav = styled.nav`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    z-index: 9999;
`;

export const Main = styled.main``;
