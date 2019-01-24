import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img alt="The last logo." src={burgerLogo}/>
  </div>
);

export default logo;