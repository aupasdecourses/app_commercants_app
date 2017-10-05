import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as Actions from '../../actions/order';
import Browse from '../../components/Browse/Browse';

class ListPage extends Component {
  render() {
    const definition = {
      increment_id: {
        type: 'title',
        baseRoute: 'orders',
        alias: '# Commande',
        sortable: true,
      },
      customer_firstname: {
        alias: 'Prénom',
      },
      customer_lastname: {
        alias: 'Nom',
      },
      created_at: {
        alias: 'Prise de commande',
      },
      ddate: {
        alias: 'Date de livraison',
        sortable: true,
        type: "date",
      },
      dtime: {
        alias: 'Créneau',
      },
      total_qty_ordered: {
        alias: 'Nombre d\'articles',
      },
      subtotal_incl_tax: {
        alias: 'Total',
        type: "currency",
      },
      shipping_description: {
        alias: 'Description',
      },
    };

    return (
      <div>
        <Browse
          title="Commandes"
          definition={definition}
          headers={this.props.columns}
          items={this.props.items}
          totalItems={this.props.total}
          fetchItems={this.props.fetchOrders}
          filterHeader={this.props.filterColumn}
          filters={this.props.location.query || {}}
          primaryKey="entity_id"
        />
      </div>
    );
  }
}

ListPage.propTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
  items: PropTypes.array,
  total: PropTypes.number,
  columns: PropTypes.object,
  fetchOrders: PropTypes.func,
  filterColumn: PropTypes.func,
  hasFetched: PropTypes.bool,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    items: state.orders.items,
    total: state.orders.total,
    columns: state.orders.columns,
    hasFetched: state.orders.hasFetched,
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(Actions, dispatch),
    { dispatch },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListPage));
