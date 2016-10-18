import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { TextField, FloatingActionButton } from 'material-ui';
import Save from 'material-ui/svg-icons/content/save';
import { Grid } from 'react-flexbox-grid/lib';

import * as ProductActions from '../../actions/product';

class CreatePage extends Component {
  render() {
    return (
      <Grid fluid>
        <FloatingActionButton
          style={{ position: 'fixed', zIndex: 2, bottom: 20, right: 20 }}
          secondary
        >
          <Save />
        </FloatingActionButton>
        <TextField
          name="name"
          floatingLabelText="Nom"
          hintText="Exemple : Pizza 4 fromages"
          fullWidth
        /><br />
        <TextField
          name="ref"
          floatingLabelText="Référence"
          hintText="Exemple : REF0054"
          fullWidth
        /><br />
        <TextField
          name="sku"
          floatingLabelText="SKU"
          fullWidth
        /><br />
        <TextField
          name="available"
          floatingLabelText="Disponible"
          fullWidth
        /><br />
        <TextField
          name="selected"
          floatingLabelText="Sélection APDC"
          fullWidth
        /><br />
        <TextField
          name="price"
          floatingLabelText="Prix"
          hintText="Prix en Euro"
          fullWidth
        /><br />
        <TextField
          name="priceUnit"
          floatingLabelText="Unité de prix"
          fullWidth
        /><br />
      </Grid>
    );
  }
}

CreatePage.propTypes = {
  profile: PropTypes.object,
  fetchProfile: PropTypes.func,
  isFetching: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    profile: state.profile.item,
    isFetching: state.profile.isFetching,
  };
}

const mapDispatchToProps = ProductActions;

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
