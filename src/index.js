import React from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../src/contexts/user.context";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
