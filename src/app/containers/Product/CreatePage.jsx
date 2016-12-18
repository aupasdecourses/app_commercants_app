import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import * as ProductActions from '../../actions/product';
import * as UserActions from '../../actions/user';
import Form from '../../components/Product/Form';

class CreatePage extends Component {
  componentWillMount() {
    this.props.fetchUsersIfNeeded(null, true);
  }

  submit(model) {
    this.props.saveProduct(null, model)
      .then((action) => {
        if (!action.error) {
          this.props.dispatch({
            type: 'NOTIFICATION_OPEN',
            data: {
              type: 'success',
              message: 'Produit sauvegardé avec succès',
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
      <Grid fluid>
        <Form
          item={{}} choicesList={this.props.choicesList}
          onSubmit={(model) => this.submit(model)}
        />
      </Grid>
    );
  }
}

CreatePage.propTypes = {
  choicesList: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    choicesList: {
      users: state.users.short,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(ProductActions, dispatch),
    bindActionCreators(UserActions, dispatch),
    { dispatch },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
