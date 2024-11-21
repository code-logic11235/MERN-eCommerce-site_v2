import React from "react";
import ReactDOM from "react-dom/client"
import App from "./app";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// try route base code splitting React applications using React.lazy or @loadable/component for route-based splitting.