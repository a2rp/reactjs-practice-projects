import React from "react";
import { projectList } from "../data/projectList";

const lazyComponentMap = {};

projectList.forEach(({ name }) => {
    lazyComponentMap[name] = React.lazy(() =>
        import(`./projects/${name}/index.jsx`)
    );
});

export { lazyComponentMap };
