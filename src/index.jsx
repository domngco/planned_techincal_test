import ReactDOM from "react-dom";
import App from "../src/container/App.jsx";
import store from "../src/container/Store.jsx";
import React from "react";
import { Provider } from "react-redux";

import reloadMagic from "./reload-magic-client.js"; // automatic reload

reloadMagic(); // automatic reload

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
