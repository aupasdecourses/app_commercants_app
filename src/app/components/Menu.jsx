import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Drawer, MenuItem, AppBar, Divider, IconButton } from 'material-ui';
import BookmarkBorderIcon from 'material-ui/svg-icons/action/bookmark-border';
import ExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app';

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
    {items.map((item, iKey) => (
      <div key={iKey}>
        {item.separator ?
          <MenuItem
            style={{
              lineHeight: '36px', minHeight: 36,
              color: context.muiTheme.tabs.textColor,
              backgroundColor: context.muiTheme.inkBar.backgroundColor
            }}
            disabled
          >
            {item.separator}
          </MenuItem> :
          <Link
            activeStyle={{ background: context.muiTheme.toolbar.backgroundColor, display: 'block' }}
            key={item.name} to={item.linkTo}
            onClick={() => { if (!pinned) { requestChange(false); } }}
          >
            <MenuItem leftIcon={item.icon}>{item.name}</MenuItem>
            <Divider />
          </Link>
        }
        <Divider />
      </div>
    ))}
    {logout ?
      <MenuItem leftIcon={<ExitToAppIcon />} onTouchTap={() => logout()}>Déconnexion</MenuItem> : ''
    }
  </Drawer>
);

Menu.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

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
