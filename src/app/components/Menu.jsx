import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Drawer, MenuItem, AppBar, Divider } from 'material-ui';

const Menu = ({ items, open, logout, requestChange }) => (
  <Drawer
    docked={false}
    open={open}
    onRequestChange={(o) => requestChange(o)}
  >
    <AppBar title="Menu" showMenuIconButton={false} />
    {items.map((item) => (
      <Link key={item.name} to={item.linkTo} onClick={() => requestChange(false)}>
        <MenuItem>{item.name}</MenuItem>
        <Divider />
      </Link>
    ))}
    {logout ?
      <MenuItem onTouchTap={() => logout()}>Déconnexion</MenuItem> : ''
    }
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
  logout: PropTypes.func,
  requestChange: PropTypes.func,
};

export default Menu;
