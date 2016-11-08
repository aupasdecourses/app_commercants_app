import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Login from '../components/Login';
import * as AuthActions from '../actions/auth';
import * as ProfileActions from '../actions/profile';

const LoginPage = ({ login, resetting, fetchProfile, isAuthenticating, hasError }) => {
  function onLogin(credential) {
    login(credential)
      .then((props) => {
        if (!props.error) {
          fetchProfile();
        }
      });
  }

  return (
    <Login
      login={onLogin}
      resetting={resetting}
      isAuthenticating={isAuthenticating} hasError={hasError}
    />
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  isAuthenticating: PropTypes.bool,
  hasError: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isAuthenticating: state.auth.isAuthenticating || state.profile.isFetching,
    hasError: state.auth.hasError
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(AuthActions, dispatch),
    bindActionCreators(ProfileActions, dispatch),
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
