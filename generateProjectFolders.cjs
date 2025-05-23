// generateProjectFolders.js
const fs = require("fs");
const path = require("path");

// List from your React app
const projectList = [
    "accordion",
    "avataar",
    "calculator",
    "calendar",
    "canvas-animation",
    "convert-metrics",
    "dictionary",
    "digital-clock",
    "dynamic-tables",
    "github-profile-finder",
    "html-colors",
    "image-slider",
    "jokes-generator",
    "language-translator",
    "leet-speak",
    "lyrics-finder",
    "memes-generator",
    "modal-component",
    "movie-search",
    "movie-trailer",
    "mui-form",
    "paint-app",
    "password-generator",
    "periodic-table",
    "qrcode-generator",
    "quiz-app",
    "random-quotes",
    "rock-paper-scissor",
    "scroll-progress-indicator",
    "scroll-to",
    "search-auto-complete",
    "sorting",
    "star-rating",
    "sudoku",
    "task-scheduler",
    "tic-tac-toe",
    "to-do-list",
    "toggle-theme",
    "typing-keyboard",
    "unicode-explorer",
    "validators",
    "weather-app",
    "word-meaning",
    "world-map",
    "world-time-zones",
];

const baseDir = path.join(__dirname, "src", "components", "projects");

projectList.forEach((project) => {
    const folderPath = path.join(baseDir, project);
    const filePath = path.join(folderPath, "index.jsx");

    // Create folder if not exists
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`📁 Created folder: ${project}`);
    }

    // Create index.jsx if not exists
    if (!fs.existsSync(filePath)) {
        const componentName = project.replace(/(^\w|-\w)/g, (m) =>
            m.replace("-", "").toUpperCase()
        );

        const boilerplate = `
import React from 'react';

const ${componentName} = () => {
  return (
    <div style={{ color: 'white' }}>
      <h2>${componentName} Component</h2>
    </div>
  );
};

export default ${componentName};
`;

        fs.writeFileSync(filePath, boilerplate.trimStart());
        console.log(`✅ Created index.jsx in: ${project}`);
    }
});
