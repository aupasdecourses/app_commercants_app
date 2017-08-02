import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NaviagationMoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import PowerSettingsNewIcon from 'material-ui/svg-icons/action/power-settings-new';

import './Header.css';

const Header = ({ title, toggleMenu, logout }) => (
  <AppBar
    title={title}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><NaviagationMoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          primaryText="Sign out" leftIcon={<PowerSettingsNewIcon />}
          onTouchTap={logout}
        />
      </IconMenu>
    }
    onLeftIconButtonTouchTap={toggleMenu}
    className="header-fixed"
  />
);

Header.defaultProps = {
  title: 'Title',
};

Header.propTypes = {
  title: PropTypes.string,
  toggleMenu: PropTypes.func,
  logout: PropTypes.func,
};

export default Header;
