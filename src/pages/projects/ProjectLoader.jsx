import React from "react";

// Preload all index.jsx files inside components/projects/*
const modules = import.meta.glob("../projects/*/index.jsx");

export const loadProjectComponent = (name) => {
    const path = `../projects/${name}/index.jsx`;
    const loader = modules[path];

    if (!loader) {
        console.error(`❌ Component not found for: ${name}`);
        return () => <h2 style={{ color: 'red' }}>Component "{name}" not found.</h2>;
    }

    return React.lazy(loader);
};
