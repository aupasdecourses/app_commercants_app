import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import Form from '../../components/User/Form';
import * as UserActions from '../../actions/user';

class CreatePage extends Component {
  submit(model) {
    this.props.saveUser(null, model)
      .then(() => {
        this.props.dispatch({
          type: 'NOTIFICATION_OPEN',
          data: {
            type: 'success',
            message: 'Utilisateur sauvegardé avec succès',
          }
        });
      });
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

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(UserActions, dispatch),
    { dispatch },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
