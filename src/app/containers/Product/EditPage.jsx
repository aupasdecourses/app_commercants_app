import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import * as Actions from '../../actions/product';
import * as ShopActions from '../../actions/shop';
import Form from '../../components/Product/Form';

class EditPage extends Component {
  componentWillMount() {
    if (this.context.role !== 'ROLE_ADMIN') {
      this.props.fetchShopsIfNeeded(null, true);
    }
    this.props.fetchProduct(this.props.match.params.id);
  }

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

  upload(data) {
    this.props.uploadToProduct(this.props.match.params.id, data)
      .then((action) => {
        if (!action.error) {
          this.props.dispatch({
            type: 'NOTIFICATION_OPEN',
            data: {
              type: 'success',
              message: 'Photo sauvegardé avec succès',
            }
          });
        } else {
          this.props.dispatch({
            type: 'NOTIFICATION_OPEN',
            data: {
              type: 'error',
              message: 'Une erreur c\'est produite pendant la sauvegarde',
            }
          });
        }
      });
  }

  remove() {
    this.props.removeProduct(this.props.match.params.id)
      .then((action) => {
        if (!action.error) {
          this.props.dispatch({
            type: 'NOTIFICATION_OPEN',
            data: {
              type: 'success',
              message: 'Produit désactivé avec succès, le produit sera manuellement supprimé après vérification de notre équipe',
            }
          });
        } else {
          this.props.dispatch({
            type: 'NOTIFICATION_OPEN',
            data: {
              type: 'error',
              message: 'Une erreur c\'est produite pendant la suppression',
            }
          });
        }
      });
  }

  submit(model) {
    this.props.saveProduct(this.props.match.params.id, model)
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
          let errors = [];

          if (!action.error.response.data.errors.errors) {
            // Note: Parse error, maybe it should be better in the reducer directly? Or creating a function or both
            const errorsRaw = action.error.response.data.errors.children;

            Object.keys(errorsRaw).reduce((o, item) => {
              if (!errorsRaw[item].errors) {
                return false;
              }

              errors = errors.concat(errorsRaw[item].errors);
            }, 0);
          } else {
            errors = action.error.response.data.errors.errors;
          }

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
        {this.props.hasFetched && <Form
          item={this.props.item} choicesList={this.props.choicesList}
          isLoading={this.props.isFetching}
          onSubmit={(model) => this.submit(model)}
          onUpload={(data) => this.upload(data)}
          onRemove={() => this.remove()}
        />}
      </Grid>
    );
  }
}

EditPage.contextTypes = {
  role: PropTypes.string,
};

EditPage.propTypes = {
  params: PropTypes.object,
  item: PropTypes.object,
  choicesList: PropTypes.object,
  fetchProduct: PropTypes.func,
  fetchShopsIfNeeded: PropTypes.func,
  uploadToProduct: PropTypes.func,
  saveProduct: PropTypes.func,
  hasFetched: PropTypes.bool,
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    item: state.product.item,
    choicesList: {
      shops: state.shops.short,
      origines: state.products.filters.origine,
    },
    hasFetched: state.product.hasFetched,
    isFetching: state.product.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(Actions, dispatch),
    bindActionCreators(ShopActions, dispatch),
    { dispatch },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
