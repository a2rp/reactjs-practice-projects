import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { projectList } from "../../data/projectList";
import { Nav, Wrapper } from "./styled";

const Header = () => {
    const navigate = useNavigate();
    const [displayMenu, setDisplayMenu] = useState(false);

    useEffect(() => {
        document.body.style.overflow = displayMenu ? "hidden" : "auto";
        document.body.style.paddingRight = displayMenu ? "0px" : "";
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "";
        };
    }, [displayMenu]);

    return (
        <>
            <Wrapper>
                <NavLink to="/" className="name" aria-label="ReactJS Practice Projects home">
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" />
                    <span>ReactJS Practice Projects</span>
                </NavLink>
                <button className="menu_link" type="button" onClick={() => setDisplayMenu((open) => !open)} aria-label={displayMenu ? "Close project menu" : "Open project menu"} title={displayMenu ? "Close project menu" : "Open project menu"}>
                    <IoMenu size={25} aria-hidden="true" />
                </button>
            </Wrapper>
            <Nav className={displayMenu ? "active" : ""}>
                <button className="emptySection" type="button" onClick={() => setDisplayMenu(false)} aria-label="Close project menu" />
                <div className="menuWrapper">
                    {projectList.map((item) => (
                        <button className="item" type="button" key={item.uri} onClick={() => { navigate(`/project/${item.uri}`); setDisplayMenu(false); }}>
                            {item.displayName}
                        </button>
                    ))}
                </div>
            </Nav>
        </>
    );
};

export default Header;
