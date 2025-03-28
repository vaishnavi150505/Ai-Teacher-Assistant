import React from "react";
import ReactDOM from "react-dom/client"; // New way to render React 18+
import App from "./App"; // Import main App component
import "./index.css"; // Apply global styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
