import React from 'react'
import { Styled } from "./styled.js";
import { projectList } from "../../data/projectList.js";
import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <Styled>
            <h1 className="header">App links</h1>
            <div className="wrapper">
                {projectList.map((item, index) => (<NavLink className="project" key={index} to={`project/${item.uri}`}>
                    {item.displayName}
                </NavLink>))}
            </div>
        </Styled>
    )
}

export default Home

