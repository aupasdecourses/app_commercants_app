import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as Actions from '../../actions/product';
import Browse from '../../components/Browse/Browse';

class ListPage extends Component {
  submit = (id, model) => {
    return this.props.saveProduct(id, model)
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
  };

  render() {
    const { filters } = this.props;

    const definition = {
      status: {
        type: 'publish',
        alias: 'Dispo.',
        sortable: true,
        style: { width: 64 },
      },
      name: {
        type: 'title',
        baseRoute: 'products',
        alias: 'Nom',
        sortable: true,
      },
      prix_public: {
        type: 'inEdit',
        alias: 'Prix',
      },
      unite_prix: {
        alias: 'Unité',
      },
      nbre_portion: {
        alias: 'Portion',
      },
      short_description: {
        alias: 'Description Portion',
      },
      origine: {
        alias: 'Origine',
        values: filters.origine,
        sortable: true,
      },
      produit_biologique: {
        alias: 'Bio',
        values: filters.produit_biologique,
        sortable: true,
        style: { width: 42 },
      },
      on_selection: {
        alias: 'Sélectionné',
        values: {
          0: 'Non',
          1: 'Oui'
        },
      },
    };

    return (
      <div>
        <Browse
          title="Liste produits"
          definition={definition}
          headers={this.props.columns}
          items={this.props.items}
          totalItems={this.props.total}
          addRoute="/products/new"
          fetchItems={this.props.fetchProducts}
          filterHeader={this.props.filterColumn}
          onSubmit={this.submit}
          filters={this.props.location.query || {}}
          primaryKey="entity_id"
        />
      </div>
    );
  }
}

ListPage.contextTypes = {
  role: PropTypes.string,
  router: PropTypes.object
};

ListPage.propTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
  items: PropTypes.array,
  filters: PropTypes.object,
  total: PropTypes.number,
  columns: PropTypes.object,
  fetchProducts: PropTypes.func,
  saveProduct: PropTypes.func,
  filterColumn: PropTypes.func,
  hasFetched: PropTypes.bool,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    items: state.products.items,
    filters: state.products.filters,
    total: state.products.total,
    columns: state.products.columns,
    hasFetched: state.products.hasFetched,
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(Actions, dispatch),
    { dispatch },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListPage));
