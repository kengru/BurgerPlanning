import React, { Component } from 'react';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSD: true
  }

  sideDCHandler = () => {
    this.setState({ showSD: false });
  }

  render () {
    return (
      <>
        <Toolbar />
        <SideDrawer open={this.state.showSD} closed={this.sideDCHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </>
    )
  }
};

export default Layout;