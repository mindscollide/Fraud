import React from "react";
import { createRoot } from "react-dom/client";
// Open Sans served from node_modules (no external font CDN); weights used by the app
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "./index.css";
import App from "./App";
// Imported after App (and therefore after App.less/antd.less) so these
// former-inline-style utilities win equal-specificity ties, the way the
// inline styles they replaced used to.
import "./styles/utilities.css";
import { BrowserRouter as Router } from "react-router-dom";
import  {Provider}  from "react-redux";
import store from "./store/store";

createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
