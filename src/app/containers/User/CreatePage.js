import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import Form from '../../components/User/Form';
import * as UserActions from '../../actions/user';

class CreatePage extends Component {
  submit(model) {
    this.props.saveUser(null, model)
      .then((action) => {
        if (!action.error) {
          this.props.dispatch({
            type: 'NOTIFICATION_OPEN',
            data: {
              type: 'success',
              message: 'Utilisateur sauvegardé avec succès',
            }
          });
        } else {
          // Note: Parse error, maybe it should be better in the reducer directly? Or creating a function or both
          const errorsRaw = action.error.response.data.errors.children;
          let errors = [];

          Object.keys(errorsRaw).reduce((o, item) => {
            if (!errorsRaw[item].errors) {
              return false;
            }

            errors = errors.concat(errorsRaw[item].errors);
          }, 0);

          this.props.dispatch({
            type: 'NOTIFICATION_OPEN',
            data: {
              type: 'error',
              message: errors,
            }
          });
        }
      });
  }

  render() {
    return (
      <Grid id="content" fluid>
        <Form
          item={{}} choicesList={this.props.choicesList}
          onSubmit={(model) => this.submit(model)}
        />
      </Grid>
    );
  }
}

CreatePage.propTypes = {
  choicesList: PropTypes.func,
  fetchShopsIfNeeded: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    choicesList: {
      shops: state.shops.short
    },
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(UserActions, dispatch),
    { dispatch },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
