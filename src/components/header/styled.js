import styled from "styled-components";

export const Wrapper = styled.header`
    border-bottom: 1px solid rgba(255,255,255,.2);
    position: fixed; top: 0; left: 0; width: 100%; height: 60px;
    background-color: #000; color: #fff; display: flex; align-items: center; justify-content: space-between; z-index: 9999;
    .name { display: flex; align-items: center; gap: 10px; padding: 9px 15px; color: #fff; text-decoration: none; font-weight: 700; }
    .name img { width: 36px; height: 36px; object-fit: contain; border: 1px solid #333; border-radius: 8px; }
    .name:hover { text-shadow: 0 0 12px rgba(255,255,255,.35); }
    .menu_link { display: flex; align-items: center; justify-content: center; height: 100%; width: 52px; cursor: pointer; border: 0; background: transparent; color: #fff; transition: border-color 180ms ease, box-shadow 180ms ease; }
    .menu_link:hover, .menu_link:focus-visible { box-shadow: 0 0 16px rgba(255,255,255,.2); outline: none; }
`;
export const Nav = styled.nav`
    position: fixed; top: 0; right: 0; height: 100vh; z-index: 10000; width: 0; overflow: hidden; display: grid; grid-template-columns: 1fr 280px; transition: width 180ms ease;
    &.active { width: 100%; }
    .emptySection { border: 0; background: rgba(0,0,0,.3); backdrop-filter: blur(3px); cursor: pointer; }
    .menuWrapper { border-left: 1px solid rgba(255,255,255,.3); background-color: #000; height: 100vh; overflow: auto; padding-top: 60px; }
    .item { width: 100%; min-height: 42px; display: flex; align-items: center; color: #aaa; padding: 12px 15px; cursor: pointer; border: 0; border-bottom: 1px solid #161616; background: transparent; text-align: left; }
    .item:hover, .item:focus-visible { color: #fff; background-color: #222; box-shadow: inset 3px 0 0 #9fd8ff; outline: none; }
    @media (max-width: 500px) { grid-template-columns: 1fr 240px; }
`;
