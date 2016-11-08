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
      <Grid fluid style={{ textAlign: 'center', marginTop: 24 }}>
        <RaisedButton
          label="Liste products" secondary style={{ marginRight: 12, height: 50 }}
          containerElement={<Link to="/products" />}
        />
        <RaisedButton
          label="Nouveau product" primary style={{ marginRight: 12, marginLeft: 12, height: 50 }}
          containerElement={<Link to="/products/new" />}
        />
        <RaisedButton
          label="Déconnexion" style={{ marginLeft: 12, height: 50 }}
          onTouchTap={() => this.props.logout()}
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
