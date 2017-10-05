import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { CircularProgress } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui/svg-icons/action/home';
import MessageIcon from 'material-ui/svg-icons/communication/message';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import ShoppingBasketIcon from 'material-ui/svg-icons/action/shopping-basket';
import FaceIcon from 'material-ui/svg-icons/action/face';
import ReactMaterialUiNotifications from 'react-materialui-notifications';

import * as AuthActions from '../actions/auth';
import Header from 'app/components/Header';
import Menu from 'app/components/Menu';
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
        name: 'Nouveau produit',
        linkTo: '/products/new',
        icon: <AddIcon />
      }, {
        name: 'Mes commandes',
        linkTo: '/orders',
        icon: <ShoppingBasketIcon />
      },
       /*{
        name: 'Mon profil',
        linkTo: '/profile',
        icon: <FaceIcon />
      },*/
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

  componentDidMount() {
    if (this.context.role !== 'ROLE_ADMIN') {
      setTimeout(
        () => {
          window.Tawk_API.showWidget();
        }, 2000);
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
        autoHide: nextProps.notification.timeout || 2000,
        additionalLines: 2
      });
    }
  }

  componentWillUnmount() {
    if (this.context.role !== 'ROLE_ADMIN') {
      window.Tawk_API.hideWidget();
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
    const { children, header, isFetching, isAuthenticated, isInited } = this.props;

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

    const renderHeader = (
      <div>
        <Link to="/" style={{ float: 'left' }}>
          <IconButton
            style={{ margin: '8px 0' }} iconStyle={{ color: '#fff' }}
          >
            <HomeIcon />
          </IconButton>
        </Link>
        {header}
      </div>
    );

    return (
      <div
        id="main"
        className={mainClass}
      >
        {isAuthenticated ?
          <div>
            {isInited &&
            <Header
              title={renderHeader}
              toggleMenu={this.toggleMenu} logout={() => this.props.logout()}
            />}
            {isInited &&
            <Menu
              items={appConfig.menuItems[this.props.role]}
              open={this.state.openMenu}
              pinned={this.state.pinned}
              togglePin={() => this.togglePinned()}
              requestChange={(open) => this.setState({ openMenu: open })}
            />}
            {loader}
            {children}
          </div> :
          <LoginPage />
        }
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
  isInited: PropTypes.bool,
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
    isInited: true, // TODO later
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
