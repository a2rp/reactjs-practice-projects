import styled from "styled-components";

export const Wrapper = styled.footer`
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding: 18px 24px;
    background-color: #000;
    color: #fff;
    .footer-main { max-width: 1440px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
    a { color: #9fd8ff; }
    .footer-links { display: flex; flex-wrap: wrap; gap: 8px; }
    .footer-links a { width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid #333; border-radius: 8px; background: #101010; color: #ddd; text-decoration: none; transition: border-color 180ms ease, box-shadow 180ms ease, color 180ms ease, background 180ms ease; }
    .footer-links a:hover, .footer-links a:focus-visible { background: #1d1d1d; border-color: #9fd8ff; color: #fff; box-shadow: 0 0 16px rgba(159,216,255,.22); outline: none; }
    @media (max-width: 600px) { .footer-main { flex-direction: column; align-items: flex-start; } }
`;
