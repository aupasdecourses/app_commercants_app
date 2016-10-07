import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import { CircularProgress, FlatButton, TextField } from 'material-ui';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid/lib';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const credential = {
      username: this.username.input.value,
      password: this.password.input.value,
      remember: true
    };

    this.props.login(credential);
  }

  render() {
    const { isAuthenticating } = this.props;

    return (
      <Row center="xs" middle="xs" className="login-box">
        <Col xs={12} sm={8} md={6}>
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
                    <CircularProgress size={1.5} />
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
                      disabled={isAuthenticating}
                    />
                  </Col>
                </Row>
              }
            </CardText>
            <CardActions style={{ textAlign: "center" }}>
              <FlatButton label={<FormattedMessage id="Sign In" />} primary onClick={this.onLogin} disabled={isAuthenticating} />
            </CardActions>
          </Card>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticating: PropTypes.bool,
  hasError: PropTypes.bool,
};

export default Login;
