import React, { Component } from "react";
import { connect } from "react-redux";

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
        <Toolbar
          isAuth={this.props.isAuth}
          toggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuth}
          open={this.state.showSD}
          closed={this.sideDCHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
