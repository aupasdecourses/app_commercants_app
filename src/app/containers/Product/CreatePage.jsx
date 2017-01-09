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

  componentDidMount() {
    setTimeout(
      () => {
        window.Tawk_API.showWidget();
      }, 2000);
    this.props.fetchUsersIfNeeded(null, true);
    this.props.fetchProduct(this.props.params.id);
  }

  componentWillUnmount() {
    window.Tawk_API.hideWidget();
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
  params: PropTypes.object,
  choicesList: PropTypes.object,
  fetchProduct: PropTypes.func,
  fetchUsersIfNeeded: PropTypes.func,
  saveProduct: PropTypes.func,
  dispatch: PropTypes.func,
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
