import React, { Component } from "react";
import { Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const src = "https://planned.com/wp-content/uploads/assets/logo-planned.svg";

export class ImageHeader extends Component {
  render() {
    return <Image as={Link} to="/" src={src} />;
  }
}

export default ImageHeader;
