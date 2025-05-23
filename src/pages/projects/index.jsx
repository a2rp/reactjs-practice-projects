import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { lazyComponentMap } from '../../components/lazyComponents';

const Projects = () => {
    const { name } = useParams();
    // console.log(name, "name");

    const Component = lazyComponentMap[name];

    return (
        <Suspense
            fallback={
                <Box sx={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            }
        >
            {Component ? <Component /> : <div style={{ color: '#fff' }}>Component "{name}" not found.</div>}
        </Suspense>
    );
};

export default Projects;
