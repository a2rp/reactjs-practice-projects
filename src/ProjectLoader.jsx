import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { lazyComponentMap } from './components/lazyComponents';

const ProjectLoader = () => {
    const { name } = useParams();
    const Component = lazyComponentMap[name];

    return (
        <Suspense fallback={<div style={{ color: "#fff" }}>Loading...</div>}>
            {Component ? <Component /> : <div style={{ color: "#fff" }}>Component not found</div>}
        </Suspense>
    );
};

export default ProjectLoader;
