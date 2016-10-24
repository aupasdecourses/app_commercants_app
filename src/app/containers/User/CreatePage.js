import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import Form from '../../components/User/Form';
import * as UserActions from '../../actions/user';

class CreatePage extends Component {
  submit(model) {
    this.props.saveUser(null, model);
  }

  render() {
    return (
      <Grid fluid>
        <Form item={{}} onSubmit={(model) => this.submit(model)} />
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    hasError: state.auth.hasError
  };
}

const mapDispatchToProps = UserActions;

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
