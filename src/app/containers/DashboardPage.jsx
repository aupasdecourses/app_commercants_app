import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  RaisedButton,
} from 'material-ui';
import { Grid } from 'react-flexbox-grid/lib';

import * as AuthActions from '../actions/auth';

class DashboardPage extends Component {
  componentDidMount() {
    if (this.context.role !== 'ROLE_ADMIN') {
      setTimeout(
        () => {
          window.Tawk_API.showWidget();
        }, 2000);
    }
  }

  componentWillUnmount() {
    if (this.context.role !== 'ROLE_ADMIN') {
      window.Tawk_API.hideWidget();
    }
  }

  render() {
    return (
      <Grid id="content" fluid style={{ textAlign: 'center', marginTop: 24 }}>
        <RaisedButton
          label="Liste products" secondary style={{ marginBottom: 12, height: 50 }}
          containerElement={<Link to="/products" />}
          fullWidth
        />
        <RaisedButton
          label="Nouveau product" primary style={{ marginBottom: 12, height: 50 }}
          containerElement={<Link to="/products/new" />}
          fullWidth
        />
        <RaisedButton
          label="Liste commandes" secondary style={{ marginBottom: 12, height: 50 }}
          containerElement={<Link to="/orders" />}
          fullWidth
        />
        <RaisedButton
          label="Déconnexion" style={{ height: 50 }}
          onTouchTap={() => this.props.logout()}
          fullWidth
        />
      </Grid>
    );
  }
}

DashboardPage.contextTypes = {
  role: PropTypes.string,
};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = AuthActions;

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
