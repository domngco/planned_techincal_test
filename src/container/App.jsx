import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Menu from "../components/menu/Menu.jsx";
import Content from "../components/content/Content.jsx";

class App extends Component {
  render = () => {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div>
            <div>
              <Menu />
            </div>
            <div>
              <Content />
            </div>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  };
}

export default App;
