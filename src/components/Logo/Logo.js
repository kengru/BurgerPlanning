import React from "react";
import { Link } from "react-router-dom";

import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.css";

const logo = props => (
  <Link to="/">
    <div className={classes.Logo} style={{ height: props.height }}>
      <img alt="The last logo." src={burgerLogo} />
    </div>
  </Link>
);

export default logo;
