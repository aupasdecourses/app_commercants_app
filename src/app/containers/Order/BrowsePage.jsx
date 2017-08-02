import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as Actions from '../../actions/order';
import Toolbar from '../../components/Browse/Toolbar';
import Filters from '../../components/Product/Filters';
import ProductList from '../../components/Browse/Table';
import Options from '../../components/Browse/Options';
import Pagination from '../../components/Pagination';

class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: props.location.query.offset ? props.location.query.offset / 20 + 1 : 1,
      showFilters: false,
      showOptions: false,
      sort: {
        by: 'id',
        dir: 'desc',
      },
      filters: props.location.query || null,
    };
  }

  componentWillMount() {
    // TODO: Find a way to use "_only"
    this.props.fetchOrders(this.state.filters);
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query)) {
      const filters = nextProps.location.query;

      this.props.fetchOrders(filters).then(() => {
        this.setState({
          filters,
          page: nextProps.location.query.offset ? nextProps.location.query.offset / 20 + 1 : 1,
          sort: {
            by: nextProps.location.query.sortBy || this.state.sort.by,
            dir: nextProps.location.query.sortDir || this.state.sort.dir,
          },
        });
      });
    }
  }

  onFilters(filters) {
    const query = {
      ...this.state.filters,
      ...filters
    };

    this.context.router.history.push({
      pathname: 'orders',
      query,
    });
  }

  onSort(sortBy) {
    let sortDir = 'asc';

    if (sortBy === this.state.sort.by && this.state.sort.dir === 'asc') {
      sortDir = 'desc';
    }

    const query = {
      ...this.state.filters,
      sortBy,
      sortDir,
    };

    this.context.router.history.push({
      pathname: 'orders',
      query,
    });
  }

  onPaginate(toPage) {
    const query = {
      ...this.state.filters,
      offset: (toPage - 1) * 20,
    };

    this.context.router.history.push({
      pathname: 'orders',
      query,
    });
  }

  render() {
    // TODO: Voir à tout mettre dans le reducer?
    const fields = {
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
      },
      dtime: {
        alias: 'Créneau',
      },
      total_qty_ordered: {
        alias: 'Nombre d\'articles',
      },
      total_paid: {
        alias: 'Total',
      },
      shipping_description: {
        alias: 'Description',
      },
    };

    const sortBy = this.state.sort.by;

    if (fields[sortBy]) {
      fields[sortBy].sortBy = this.state.sort.dir;
    }

    const displayedFields = {};

    // TODO: We may be able to avoid reload using state
    // TODO: Check if it is more fast to do it here, or just a if in the List better
    Object.keys(fields).map((key) => {
      if (this.props.columns[key]) {
        displayedFields[key] = fields[key];
      }

      return null;
    });

    return (
      <div>
        <div id="content" className="paginate">
          <Toolbar
            title="Liste commandes"
            onSearch={(filters) => this.onFilters(filters)}
            toggleOptions={() => this.setState({ showOptions: !this.state.showOptions })}
          />
          <Options
            open={this.state.showOptions}
            fields={fields} columns={this.props.columns}
            toggleOptions={() => this.setState({ showOptions: !this.state.showOptions })}
            showColumn={(column) => this.props.filterColumn(column)}
          />
          {this.state.showFilters &&
          <Filters onSubmit={(filters) => this.onFilters(filters)} />}
          {this.props.hasFetched &&
          <ProductList
            fields={displayedFields}
            items={this.props.items}
            sortByColumn={(by) => this.onSort(by)}
            primaryKey="entity_id"
          />}
        </div>
        <Pagination
          page={this.state.page} totalPages={Math.ceil(this.props.total / 20)}
          onClickPaginate={(toPage) => this.onPaginate(toPage)}
        />
      </div>
    );
  }
}

ListPage.contextTypes = {
  router: PropTypes.object
};

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
