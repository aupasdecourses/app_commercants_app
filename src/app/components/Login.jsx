import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import { CircularProgress, FlatButton, TextField, Snackbar } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid/lib';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showReset: false,
    };

    this.onLogin = this.onLogin.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.onLogin();
    }
  }

  onLogin() {
    const credential = {
      username: this.username.input.value,
      password: this.password.input.value,
    };

    this.props.login(credential);
  }

  onReset() {
    this.props.resetting(this.reset.input.value);
  }

  render() {
    const { isAuthenticating, hasError } = this.props;

    return (
      <Row center="xs" middle="xs" className="login-box">
        <Col xs={12} sm={8} md={6}>
          {!this.state.showReset ?
            <Card>
              <CardTitle
                title={<FormattedMessage id="Login" />}
                subtitle={<FormattedMessage id="Please enter your login to sign in" />}
                className="login-title"
              />
              <CardText>
                {isAuthenticating ?
                  <Row center="xs">
                    <Col xs>
                      <CircularProgress size={20} />
                    </Col>
                  </Row> :
                  <Row>
                    <Col xs={12} sm={6}>
                      <TextField
                        ref={(c) => { this.username = c; }}
                        hintText={<FormattedMessage id="Enter your username" />}
                        floatingLabelText={<FormattedMessage id="Username" />}
                        fullWidth
                        disabled={isAuthenticating}
                      />
                    </Col>
                    <Col xs={12} sm={6}>
                      <TextField
                        ref={(c) => { this.password = c; }}
                        hintText={<FormattedMessage id="Enter your password" />}
                        floatingLabelText={<FormattedMessage id="Password" />}
                        type="password"
                        fullWidth
                        onKeyDown={(e) => this.onKeyDown(e)}
                        disabled={isAuthenticating}
                      />
                    </Col>
                  </Row>
                }
              </CardText>
              <CardActions style={{ textAlign: 'center' }}>
                <FlatButton
                  label={<FormattedMessage id="Sign In" />} primary
                  onClick={this.onLogin} disabled={isAuthenticating}
                />
                <FlatButton
                  label={<FormattedMessage id="Forgot password" />} secondary
                  onTouchTap={() => this.setState({ showReset: true })}
                  disabled={isAuthenticating}
                />
              </CardActions>
            </Card> :
            <Card>
              <CardTitle
                title={<FormattedMessage id="Reset password" />}
                subtitle={<FormattedMessage id="Please enter your username or email" />}
                className="login-title"
              />
              <CardText>
                {isAuthenticating ?
                  <Row center="xs">
                    <Col xs>
                      <CircularProgress size={20} />
                    </Col>
                  </Row> :
                  <Row>
                    <Col xs={12}>
                      <TextField
                        ref={(c) => { this.reset = c; }}
                        hintText={<FormattedMessage id="Enter your username or Email" />}
                        floatingLabelText={<FormattedMessage id="Username or Email" />}
                        fullWidth
                        disabled={isAuthenticating}
                      />
                    </Col>
                  </Row>
                }
              </CardText>
              <CardActions style={{ textAlign: 'center' }}>
                <FlatButton
                  label={<FormattedMessage id="Reset" />} primary
                  onClick={this.onReset} disabled={isAuthenticating}
                />
                <FlatButton
                  label={<FormattedMessage id="Cancel" />} secondary
                  onTouchTap={() => this.setState({ showReset: false })}
                  disabled={isAuthenticating}
                />
              </CardActions>
            </Card>
          }

        </Col>
        <Snackbar
          open={hasError}
          message={<FormattedMessage id="Username or password incorrect" />}
          autoHideDuration={4000}
        />
      </Row>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  resetting: PropTypes.func,
  isAuthenticating: PropTypes.bool,
  hasError: PropTypes.bool,
};

export default Login;
