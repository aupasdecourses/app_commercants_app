import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { FloatingActionButton } from 'material-ui';
import SaveIcon from 'material-ui/svg-icons/content/save';

import * as ProductActions from '../../actions/product';

class SettingsPage extends Component {
  render() {
    return (
      <div>
        Liste des colonnes avec checkbox pour activer / désactiver la colonne
        <FloatingActionButton
          className="floatButton"
        >
          <SaveIcon />
        </FloatingActionButton>
      </div>
    );
  }
}

SettingsPage.propTypes = {
  items: PropTypes.array,
  fetchProducts: PropTypes.func,
  hasFetched: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    items: state.products.items,
    hasFetched: state.products.hasFetched,
  };
}

const mapDispatchToProps = ProductActions;

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
