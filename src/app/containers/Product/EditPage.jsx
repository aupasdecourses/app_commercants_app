import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import * as ProductActions from '../../actions/product';
import Form from '../../components/Product/Form';

class EditPage extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.params.id);
  }

  upload(data) {
    this.props.uploadToProduct(this.props.params.id, data)
      .then(() => {
        this.props.dispatch({
          type: 'NOTIFICATION_OPEN',
          data: {
            type: 'success',
            message: 'Produit sauvegardé avec succès',
          }
        });
      });
  }

  submit(model) {
    this.props.saveProduct(this.props.params.id, model)
      .then(() => {
        this.props.dispatch({
          type: 'NOTIFICATION_OPEN',
          data: {
            type: 'success',
            message: 'Produit sauvegardé avec succès',
          }
        });
      });
  }

  render() {
    return (
      <Grid fluid>
        {this.props.hasFetched && <Form
          item={this.props.item}
          isLoading={this.props.isFetching}
          onSubmit={(model) => this.submit(model)}
          onUpload={(data) => this.upload(data)}
        />}
      </Grid>
    );
  }
}

EditPage.propTypes = {
  params: PropTypes.object,
  item: PropTypes.object,
  fetchProduct: PropTypes.func,
  saveProduct: PropTypes.func,
  hasFetched: PropTypes.bool,
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    item: state.product.item,
    hasFetched: state.product.hasFetched,
    isFetching: state.product.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(ProductActions, dispatch),
    { dispatch },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
