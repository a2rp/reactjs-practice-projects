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
    height: 60px;
    background-color: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
        padding: 15px;
    }
    .menu_link {
        /* border: 1px solid #f00; */
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 50px;
        cursor: pointer;
    }
`;

export const Nav = styled.nav`
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    z-index: 9999;
    width: 0;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 280px;
    /* align-items: stretch;
    justify-content: space-between; */
    transition: width 0.2s ease;

    &.active {
        width: 100%;
    }

    .emptySection {
        /* width: 100%; */
        background-color: rgba(0, 0, 0, 0.3);
        color: orangered;
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        display: flex;
        align-items: center;
        justify-content: center;
        align-items: center;
    }
    .menuWrapper {
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        background-color: #000;
        height: 100vh;
        overflow: auto;

        .item {
            height: 40px;
            display: flex;
            align-items: center;
            color: #aaa;
            padding: 15px;
            cursor: pointer;

            &:hover {
                background-color: #222;
            }
        }
    }
`;

export const Main = styled.main`
    /* border: 1px solid rgba(255, 255, 255, 0.1); */
    border-bottom: none;
    max-width: 1440px;
    margin: auto;
    min-height: 100vh;
    padding: 100px 50px;
    color: #fff;
    background-color: rgb(24, 24, 24);

    @media (width<500px) {
        padding: 14vh 15px;
    }
`;

export const Footer = styled.footer`
    /* height: 30px; */
    padding: 15px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 50px;
    flex-wrap: wrap;
    background-color: #000;
    color: #fff;

    a {
        color: aqua;

        &:hover {
            text-decoration: none;
        }
    }
`;
