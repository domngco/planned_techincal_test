import ReactDOM from "react-dom";
import App from "../src/container/App.jsx";
import store from "../src/container/store.js";
import React from "react";
import { Provider } from "react-redux";

import reloadMagic from "./reload-magic-client.js"; // automatic reload

reloadMagic(); // automatic reload

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
