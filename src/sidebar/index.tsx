import React from "react";
import { createRoot } from "react-dom/client";
import Sidebar from "./App";
import "./style.css";

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  
  const root = createRoot(appContainer);
  root.render(<Sidebar />);
}

init();