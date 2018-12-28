import React from 'react';

const layout = (props) => {
  return (
    <>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main>
        {props.children}
      </main>
    </>
  )
};

export default layout;