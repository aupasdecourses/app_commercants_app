import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { CircularProgress } from 'material-ui';
import MessageIcon from 'material-ui/svg-icons/communication/message';
import ReactMaterialUiNotifications from 'react-materialui-notifications';

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

  componentWillUpdate(nextProps) {
    if (nextProps.notification && this.props.notification !== nextProps.notification) {
      let message = nextProps.notification.message;

      if (Array.isArray(nextProps.notification.message)) {
        message = nextProps.notification.message.map((m, i) => <span key={i}>{m}<br /></span>);
      }

      ReactMaterialUiNotifications.showNotification({
        title: 'Notice',
        additionalText: message,
        iconBadgeColor: nextProps.notification.type === 'success' ? '#4caf50' : '#ff5722',
        icon: <MessageIcon />,
        autoHide: 2000,
        additionalLines: 2
      });
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
          logout={this.props.logout}
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
        <ReactMaterialUiNotifications
          desktop
          rootStyle={{ right: 25, top: 64 }}
        />
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
  notification: PropTypes.object,
  children: PropTypes.element.isRequired,
  isFetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    role: state.profile.role,
    notification: state.ui.notification,
    isFetching: state.profile.isFetching || state.ui.fetching,
    isAuthenticated: state.auth.isAuthenticated && state.profile.hasFetched,
  };
}

const mapDispatchToProps = AuthActions;

export default connect(mapStateToProps, mapDispatchToProps)(App);
