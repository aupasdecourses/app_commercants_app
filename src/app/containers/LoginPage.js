import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Login from '../components/Login';
import * as AuthActions from '../actions/auth';
import * as ProfileActions from '../actions/profile';

const LoginPage = ({ login, resetting, fetchProfile, isAuthenticating, hasError, dispatch }) => {
  function onLogin(credential) {
    login(credential)
      .then((props) => {
        if (!props.error) {
          fetchProfile();
        }
      });
  }

  function onReset(username) {
    resetting(username)
      .then((action) => {
        console.log(action);
        if (!action.error) {
          dispatch({
            type: 'NOTIFICATION_OPEN',
            data: {
              type: 'success',
              message: action.payload.data.message,
            }
          });
        } else {
          dispatch({
            type: 'NOTIFICATION_OPEN',
            data: {
              type: 'error',
              message: action.error.response.data.message,
            }
          });
        }
      });
  }

  return (
    <Login
      login={onLogin}
      resetting={onReset}
      isAuthenticating={isAuthenticating} hasError={hasError}
    />
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  resetting: PropTypes.func.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  isAuthenticating: PropTypes.bool,
  hasError: PropTypes.bool,
  dispatch: PropTypes.func,
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
    { dispatch },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
