import React, { Component } from "react";

import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSD: false
  };

  sideDCHandler = () => {
    this.setState({ showSD: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSD: !prevState.showSD };
    });
  };

  render() {
    return (
      <>
        <Toolbar toggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer open={this.state.showSD} closed={this.sideDCHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
