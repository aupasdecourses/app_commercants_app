import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { CircularProgress } from 'material-ui';
import MessageIcon from 'material-ui/svg-icons/communication/message';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import ShoppingBasketIcon from 'material-ui/svg-icons/action/shopping-basket';
import FaceIcon from 'material-ui/svg-icons/action/face';
import ReactMaterialUiNotifications from 'react-materialui-notifications';

import * as AuthActions from '../actions/auth';
import Header from 'app/components/Header';
import Menu from 'app/components/Menu';
import Footer from 'app/components/Footer';
import LoginPage from 'app/containers/LoginPage';

import './App.css';

const appConfig = {
  title: 'APDC',
  menuItems: {
    ROLE_USER: [
      {
        name: 'Tableau de bord',
        linkTo: '/',
        icon: <DashboardIcon />
      }, {
        name: 'Mes produits',
        linkTo: '/products',
        icon: <DescriptionIcon />
      }, {
        name: 'Mon profil',
        linkTo: '/profile',
        icon: <FaceIcon />
      },
    ],
    ROLE_ADMIN: [
      {
        name: 'Tableau de bord',
        linkTo: '/',
        icon: <DashboardIcon />
      }, {
        separator: 'Produits',
      }, {
        name: 'Liste produits',
        linkTo: '/products',
        icon: <DescriptionIcon />
      }, {
        name: 'Nouveau produit',
        linkTo: '/products/new',
        icon: <DescriptionIcon />
      }, {
        name: 'Commandes',
        linkTo: '/orders',
        icon: <ShoppingBasketIcon />
      }, {
        name: 'Utilisateurs',
        linkTo: '/users',
        icon: <FaceIcon />
      },
    ]
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openMenu: props.pinned === 2,
      pinned: !!props.pinned,
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
    this.setState({ openMenu: !this.state.openMenu }, () => {
      if (this.state.pinned) {
        this.props.dispatch({
          type: 'PIN_CHANGE',
          data: this.state.openMenu ? 2 : 1
        });
      }
    });
  }

  togglePinned() {
    this.setState({ pinned: !this.state.pinned }, () => {
      this.props.dispatch({
        type: 'PIN_CHANGE',
        data: !this.state.pinned ? 0 : 2
      });
    });
  }

  render() {
    const { children, isFetching, isAuthenticated } = this.props;

    const loader = isFetching ?
      <div className="fullLoader">
        <CircularProgress
          style={{ position: 'fixed', left: 0, right: 0, top: '45%', margin: '0 auto' }}
          size={100}
          thickness={5}
        />
      </div> : '';

    const mainClass = isAuthenticated ?
      `${this.state.pinned && 'pinned'} ${this.state.openMenu ? 'open' : 'close'}` : '';

    return (
      <div
        id="main"
        className={mainClass}
      >
        {isAuthenticated &&
        <Header
          title={appConfig.title}
          toggleMenu={this.toggleMenu} logout={() => this.props.logout()}
        />}
        {isAuthenticated &&
        <Menu
          items={appConfig.menuItems[this.props.role]}
          open={this.state.openMenu}
          logout={this.props.logout}
          pinned={this.state.pinned}
          togglePin={() => this.togglePinned()}
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
          maxNotifications={8}
          rootStyle={{ right: 25, top: 64, zIndex: 1 }}
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
  pinned: PropTypes.number,
  children: PropTypes.element.isRequired,
  isFetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func,
  logout: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    role: state.profile.role,
    notification: state.ui.notification,
    pinned: state.ui.pinned,
    isFetching: state.profile.isFetching || state.ui.fetching,
    isAuthenticated: state.auth.isAuthenticated && state.profile.hasFetched,
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(AuthActions, dispatch),
    { dispatch },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
