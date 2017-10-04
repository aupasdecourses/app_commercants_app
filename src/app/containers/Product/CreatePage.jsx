import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import * as Actions from '../../actions/product';
import * as ShopActions from '../../actions/shop';
import Form from '../../components/Product/Form';

import './ProductPage.css';

class CreatePage extends Component {
  componentWillMount() {
    if (this.context.role === 'ROLE_ADMIN') {
      this.props.fetchShopsIfNeeded(null, true);
    }
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
      <Grid id="content" fluid>
        <Form
          item={{}} choicesList={this.props.choicesList}
          onSubmit={(model) => this.submit(model)}
        />
      </Grid>
    );
  }
}

CreatePage.contextTypes = {
  role: PropTypes.string,
};

CreatePage.propTypes = {
  params: PropTypes.object,
  choicesList: PropTypes.object,
  fetchProduct: PropTypes.func,
  fetchShopsIfNeeded: PropTypes.func,
  saveProduct: PropTypes.func,
  dispatch: PropTypes.func,
};

function compare(a,b) {
  if (a[1] < b[1])
    return -1;
  if (a[1] > b[1])
    return 1;
  return 0;
}

function sortValue(array){
  var sortable = [];
  for (var elt in array) {
      sortable.push([elt, array[elt]]);
  }
  sortable.sort(compare);
  return sortable;
}

function mapStateToProps(state) {
  return {
    choicesList: {
      shops: state.shops.short,
      origines: sortValue(state.products.filters.origine),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(Actions, dispatch),
    bindActionCreators(ShopActions, dispatch),
    { dispatch },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
