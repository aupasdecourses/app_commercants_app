import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import * as ProductActions from '../../actions/product';
import Form from '../../components/Product/Form';

class CreatePage extends Component {
  submit(model) {
    this.props.saveProduct(null, model)
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
        <Form item={{}} onSubmit={(model) => this.submit(model)} />
      </Grid>
    );
  }
}

CreatePage.propTypes = {};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(ProductActions, dispatch),
    { dispatch },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
