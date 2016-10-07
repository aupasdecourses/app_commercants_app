import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Drawer, MenuItem, AppBar, Divider } from 'material-ui';

const Menu = ({ items, open, requestChange }) => (
  <Drawer
    docked={false}
    open={open}
    onRequestChange={(o) => requestChange(o)}
  >
    <AppBar title="Title" showMenuIconButton={false} />
    {items.map((item) => (
      <Link key={item.name} to={item.linkTo} onClick={() => requestChange(false)}>
        <MenuItem>{item.name}</MenuItem>
        <Divider />
      </Link>
    ))}
  </Drawer>
);

Menu.defaultProps = {
  items: [
    { name: 'Dashboard', linkTo: '/' }
  ],
  open: false,
};

Menu.propTypes = {
  items: PropTypes.array,
  open: PropTypes.bool,
  requestChange: PropTypes.func,
};

export default Menu;
