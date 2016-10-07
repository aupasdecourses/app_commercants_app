import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

import './Header.css';

const Header = ({ title, toggleMenu }) => (
  <AppBar
    title={title}
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    onLeftIconButtonTouchTap={toggleMenu}
    className="header-fixed"
  />
);

Header.defaultProps = {
  title: 'Title',
}

Header.propTypes = {
  title: PropTypes.string,
  toggleMenu: PropTypes.func,
};

export default Header;
