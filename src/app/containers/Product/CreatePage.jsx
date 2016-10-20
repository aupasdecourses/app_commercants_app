import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import * as ProductActions from '../../actions/product';
import Form from '../../components/Product/Form';

class CreatePage extends Component {
  submit(model) {
    this.props.saveProduct(null, model);
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

const mapDispatchToProps = ProductActions;

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
