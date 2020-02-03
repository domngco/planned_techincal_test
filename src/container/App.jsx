import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import Menu from "../components/menu/Menu.jsx";
import Content from "../components/content/Content.jsx";
import { Container, Grid } from "semantic-ui-react";
import ImageHeader from "../components/header/ImageHeader.jsx";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Container style={({ padding: "2rem" }, { marginTop: "2rem" })}>
            <ImageHeader />
            <Grid style={{ marginTop: "1em" }}>
              <Grid.Column width={3}>
                <Menu />
              </Grid.Column>
              <Grid.Column width={13}>
                <Content />
              </Grid.Column>
            </Grid>
          </Container>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
