import React from "react";
import { createRoot } from "react-dom/client";
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
