import styled from "styled-components";

export const Wrapper = styled.header`
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
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
    z-index: 9999;

    .name {
        padding: 15px;
        color: #fff;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
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
        white-space: nowrap;
        overflow: hidden;
        min-width: 30px;

        span {
            transition: transform 0.2s ease;
            display: inline-block;
        }

        @media (width<500px) {
            span {
                transform: rotate(-90deg);
                white-space: nowrap;
            }
        }
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
