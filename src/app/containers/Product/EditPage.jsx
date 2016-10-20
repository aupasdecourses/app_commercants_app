import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import * as ProductActions from '../../actions/product';
import Form from '../../components/Product/Form';

class EditPage extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.params.id);
  }

  submit(model) {
    this.props.saveProduct(this.props.params.id, model);
  }

  render() {
    return (
      <Grid fluid>
        {this.props.hasFetched && <Form
          item={this.props.item}
          isLoading={this.props.isFetching}
          onSubmit={(model) => this.submit(model)}
        />}
      </Grid>
    );
  }
}

EditPage.propTypes = {
  item: PropTypes.object,
  fetchProduct: PropTypes.func,
  saveProduct: PropTypes.func,
  hasFetched: PropTypes.bool,
  isFetching: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    item: state.product.item,
    hasFetched: state.product.hasFetched,
    isFetching: state.product.isFetching,
  };
}

const mapDispatchToProps = ProductActions;

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
