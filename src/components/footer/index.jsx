import React from "react";
import { FiCoffee, FiCode, FiFacebook, FiGithub, FiGlobe, FiHeart, FiLinkedin, FiMail, FiYoutube } from "react-icons/fi";
import { Wrapper } from "./styled";

const links = [
    ["Portfolio", "https://www.ashishranjan.net/", FiGlobe],
    ["GitHub", "https://github.com/a2rp", FiGithub],
    ["CodePen", "https://codepen.io/ash1198", FiCode],
    ["LinkedIn", "https://www.linkedin.com/in/aashishranjan", FiLinkedin],
    ["Facebook", "https://www.facebook.com/theash.ashish/", FiFacebook],
    ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", FiYoutube],
    ["Email", "mailto:ash.ranjan09@gmail.com", FiMail],
    ["Support", "https://a2rp-donation-page.netlify.app/", FiHeart],
    ["Buy Me a Coffee", "https://buymeacoffee.com/a2rp", FiCoffee],
    ["Patreon", "https://patreon.com/a2rp", FiHeart],
];

const Footer = () => (
    <Wrapper>
        <div className="footer-main">
            <div>Copyright © {new Date().getFullYear()} <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></div>
            <div className="footer-links" aria-label="External links">
                {links.map(([label, href, Icon]) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                        {React.createElement(Icon, { "aria-hidden": true })}
                    </a>
                ))}
            </div>
        </div>
    </Wrapper>
);

export default Footer;
