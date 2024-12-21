import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client"


const container = document.getElementById('root')!;

const root = createRoot(container);

// Render your App component
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);