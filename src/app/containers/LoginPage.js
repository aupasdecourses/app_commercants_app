import { connect } from 'react-redux';

import Login from '../components/Login';
import * as AuthActions from '../actions/auth';

function mapStateToProps(state) {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    hasError: state.auth.hasError
  };
}

const mapDispatchToProps = AuthActions;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
