import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Drawer, MenuItem, AppBar, Divider, IconButton } from 'material-ui';
import BookmarkBorderIcon from 'material-ui/svg-icons/action/bookmark-border';

const Menu = ({ items, open, pinned, logout, togglePin, requestChange }, context) => (
  <Drawer
    style={{ backgroundColor: '#eee' }}
    docked={pinned}
    open={open}
    onRequestChange={(o) => requestChange(o)}
  >
    <AppBar
      title="Menu"
      showMenuIconButton={false}
      iconElementRight={
        <IconButton onTouchTap={() => togglePin()}>
          <BookmarkBorderIcon />
        </IconButton>}
    />
    {items.map((item) => (
      <Link
        key={item.name} to={item.linkTo}
        onClick={() => { if (!pinned) { requestChange(false); } }}
      >
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
  pinned: PropTypes.bool,
  logout: PropTypes.func,
  togglePin: PropTypes.func,
  requestChange: PropTypes.func,
};

export default Menu;
