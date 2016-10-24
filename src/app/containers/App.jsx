import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { CircularProgress } from 'material-ui';

import * as AuthActions from '../actions/auth';
import Header from 'app/components/Header';
import Menu from 'app/components/Menu';
import Footer from 'app/components/Footer';
import LoginPage from 'app/containers/LoginPage';

import './App.css';

const appConfig = {
  title: 'Au Pas De Courses',
  menuItems: {
    ROLE_USER: [
      {
        name: 'Dashboard',
        linkTo: '/'
      }, {
        name: 'Mes produits',
        linkTo: '/products'
      }, {
        name: 'Mon profil',
        linkTo: '/profile'
      },
    ],
    ROLE_ADMIN: [
      {
        name: 'Dashboard',
        linkTo: '/'
      }, {
        name: 'Produits',
        linkTo: '/products'
      }, {
        name: 'Utilisateurs',
        linkTo: '/users'
      },
    ]
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openMenu: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  getChildContext() {
    return { role: this.props.role };
  }

  componentWillMount() {
    const auth = this.props.auth;

    if (!auth || auth.expire < Date.now()) {
      this.props.logout();
    }
  }

  toggleMenu() {
    this.setState({
      openMenu: !this.state.openMenu,
    });
  }

  render() {
    const { children, isFetching, isAuthenticated } = this.props;

    const loader = isFetching ?
      <div className="fullLoader">
        <CircularProgress
          style={{ position: 'fixed', left: 0, right: 0, top: '45%', margin: '0 auto' }}
          size={2}
        />
      </div> : '';

    return (
      <div>
        {isAuthenticated &&
          <Header title={appConfig.title} toggleMenu={this.toggleMenu} />}
        {isAuthenticated &&
          <Menu
            items={appConfig.menuItems[this.props.role]}
            open={this.state.openMenu}
            requestChange={(open) => this.setState({ openMenu: open })}
          />}
        {isAuthenticated ?
          <div>
            {loader}
            {children}
          </div> :
          <LoginPage />}
        {isAuthenticated &&
          <Footer />}
      </div>
    );
  }
}

App.childContextTypes = {
  role: PropTypes.string,
};

App.propTypes = {
  auth: PropTypes.object,
  role: PropTypes.string,
  children: PropTypes.element.isRequired,
  isFetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    role: state.profile.role,
    isFetching: state.profile.isFetching || state.ui.fetching,
    isAuthenticated: state.auth.isAuthenticated && state.profile.hasFetched,
  };
}

const mapDispatchToProps = AuthActions;

export default connect(mapStateToProps, mapDispatchToProps)(App);
