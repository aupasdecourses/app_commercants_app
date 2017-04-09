import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {
  RaisedButton,
} from 'material-ui';
import { Grid } from 'react-flexbox-grid/lib';

import * as AuthActions from '../actions/auth';

class DashboardPage extends Component {
  componentDidMount() {
    setTimeout(
      () => {
        window.Tawk_API.showWidget();
      }, 2000);
  }

  componentWillUnmount() {
    window.Tawk_API.hideWidget();
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

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = AuthActions;

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
