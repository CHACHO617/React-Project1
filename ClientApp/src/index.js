import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
)