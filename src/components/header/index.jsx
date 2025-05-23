import React, { useEffect, useState } from 'react'
import { Nav, Wrapper } from './styled'
import { IoMenu } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import { projectList } from '../../data/projectList';

const Header = () => {
    const navigate = useNavigate();
    const [displayMenu, setDisplayMenu] = useState(false);

    useEffect(() => {
        if (displayMenu) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '25px';
        } else {
            const timeout = setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 1000 * 0.2);

            return () => clearTimeout(timeout);
        }
    }, [displayMenu]);


    const handleMenuClick = () => {
        setDisplayMenu(displayMenu => !displayMenu);
    };


    return (
        <>
            <Wrapper>
                <NavLink to="/" className='name'>
                    ReactJS Practice Projects
                </NavLink>
                <div className='menu_link' onClick={handleMenuClick}>
                    <IoMenu size={25} />
                </div>
            </Wrapper>

            <Nav className={`${displayMenu ? "active" : ""}`}>
                <div className="emptySection" onClick={handleMenuClick}>
                    <span>
                        {/* click here to close */}
                    </span>
                </div>
                <div className="menuWrapper">
                    {projectList.map((item, index) => (
                        <div
                            className="item"
                            key={index}
                            onClick={() => {
                                navigate(`/project/${item.uri}`);
                                setDisplayMenu(false);
                            }}
                        >
                            {item.displayName}
                        </div>
                    ))}
                </div>
            </Nav>
        </>
    )
}

export default Header