import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import {
  AppBar, Checkbox, Divider, Drawer, FloatingActionButton, RaisedButton, Subheader
} from 'material-ui';
import {
  List, ListItem
} from 'material-ui/List';
import {
  ToolbarGroup, ToolbarSeparator, ToolbarTitle
} from 'material-ui/Toolbar';
import AddIcon from 'material-ui/svg-icons/content/add';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ActionSettingsIcon from 'material-ui/svg-icons/action/settings';

import * as ProductActions from '../../actions/product';
import Toolbar from '../../components/Browse/Toolbar';
import Filters from '../../components/Product/Filters';
import ProductList from '../../components/Browse/Table';
import Options from '../../components/Browse/Options';
import Pagination from '../../components/Pagination';

class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
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
    this.props.fetchProducts(this.state.filters);
  }

  componentDidMount() {
    setTimeout(
      () => {
        window.Tawk_API.showWidget();
      }, 2000);
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.location.query) !== JSON.stringify(this.props.location.query)) {
      const filters = nextProps.location.query;

      this.props.fetchProducts(filters).then(() => {
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

  componentWillUnmount() {
    window.Tawk_API.hideWidget();
  }

  onFilters(filters) {
    const query = {
      ...this.state.filters,
      ...filters
    };

    this.props.router.push({
      pathname: 'products',
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

    this.props.router.push({
      pathname: 'products',
      query,
    });
  }

  onPaginate(toPage) {
    const query = {
      ...this.state.filters,
      offset: (toPage - 1) * 20,
    };

    this.props.router.push({
      pathname: 'products',
      query,
    });
  }

  submit(id, model) {
    this.props.saveProduct(id, model)
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
  }

  render() {
    // TODO: Voir à tout mettre dans le reducer?
    const fields = {
      available: {
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
      price: {
        alias: 'Prix',
      },
      type: {
        alias: 'Unité',
      },
      portionNumber: {
        alias: 'Portion',
      },
      description: {
        alias: 'Description',
      },
      origin: {
        alias: 'Origine',
        sortable: true,
      },
      bio: {
        alias: 'Bio',
        sortable: true,
        style: { width: 42 },
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
            title="Liste produits"
            onSearch={(filters) => this.onFilters(filters)}
            toggleFilters={() => this.setState({ showFilters: !this.state.showFilters })}
            toggleOptions={() => this.setState({ showOptions: !this.state.showOptions })}
          />
          <FloatingActionButton
            className="floatButton"
            containerElement={<Link to="/products/new" />}
          >
            <AddIcon />
          </FloatingActionButton>
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
            onSubmit={(id, model) => this.submit(id, model)}
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
  role: PropTypes.string,
  muiTheme: PropTypes.object.isRequired,
};

ListPage.propTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
  items: PropTypes.array,
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
    total: state.products.total,
    columns: state.products.columns,
    hasFetched: state.products.hasFetched,
  };
}


function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(ProductActions, dispatch),
    { dispatch },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListPage));
