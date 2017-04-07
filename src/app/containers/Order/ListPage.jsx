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
  Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle
} from 'material-ui/Toolbar';
import AddIcon from 'material-ui/svg-icons/content/add';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ActionSettingsIcon from 'material-ui/svg-icons/action/settings';

import * as ProductActions from '../../actions/product';
import Filters from '../../components/Product/Filters';
import ProductList from '../../components/Browse/Table';
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
            by: nextProps.location.query.sortBy ? nextProps.location.query.sortBy : this.state.sort.by,
            dir: nextProps.location.query.sortDir ? nextProps.location.query.sortDir : this.state.sort.dir,
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
    const filters = {
      offset: (toPage - 1) * 20,
      ...this.state.filters,
    };

    this.props.fetchProducts(filters).then(() => {
      this.setState({ page: toPage });
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
    const headers = {
      available: {
        alias: 'Dispo.',
        sortable: true,
        style: { width: 64 },
      },
      name: {
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

    if (headers[sortBy]) {
      headers[sortBy].sortBy = this.state.sort.dir;
    }

    const displayedHeaders = {};

    // TODO: We may be able to avoid reload using state
    // TODO: Check if it is more fast to do it here, or just a if in the List better
    Object.keys(headers).map((key) => {
      if (this.props.columns[key]) {
        displayedHeaders[key] = headers[key];
      }

      return null;
    });

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Liste produits" />
          </ToolbarGroup>
          <ToolbarGroup>
            <SearchIcon
              style={{ cursor: 'pointer', paddingLeft: 24 }}
              color={this.context.muiTheme.toolbar.iconColor}
              hoverColor={this.context.muiTheme.toolbar.hoverColor}
              onClick={() => this.setState({ showFilters: !this.state.showFilters })}
            />
            <ToolbarSeparator />
            <RaisedButton
              onTouchTap={() => this.setState({ showOptions: !this.state.showOptions })}
              label="Colonnes"
              icon={<ActionSettingsIcon />}
              secondary
            />
          </ToolbarGroup>
        </Toolbar>
        <FloatingActionButton
          className="floatButton"
          containerElement={<Link to="/products/new" />}
        >
          <AddIcon />
        </FloatingActionButton>
        <Drawer
          docked={false}
          openSecondary
          open={this.state.showOptions}
          onRequestChange={(open) => this.setState({ showOptions: open })}
        >
          <AppBar title="Options" showMenuIconButton={false} />
          <List>
            <Subheader>Colonnes</Subheader>
            <ListItem
              primaryText="Dispo"
              leftCheckbox={
                <Checkbox
                  onCheck={(e, isChecked) => this.props.filterColumn({ available: isChecked })}
                  defaultChecked={this.props.columns.available}
                />
              }
            />
            <ListItem
              primaryText="Prix"
              leftCheckbox={
                <Checkbox
                  onCheck={(e, isChecked) => this.props.filterColumn({ price: isChecked })}
                  defaultChecked={this.props.columns.price}
                />
              }
            />
            <ListItem
              primaryText="Unité"
              leftCheckbox={
                <Checkbox
                  onCheck={(e, isChecked) => this.props.filterColumn({ type: isChecked })}
                  defaultChecked={this.props.columns.type}
                />
              }
            />
            <ListItem
              primaryText="Portion"
              leftCheckbox={
                <Checkbox
                  onCheck={(e, isChecked) => this.props.filterColumn({ portionNumber: isChecked })}
                  defaultChecked={this.props.columns.portionNumber}
                />
              }
            />
            <ListItem
              primaryText="Description"
              leftCheckbox={
                <Checkbox
                  onCheck={(e, isChecked) => this.props.filterColumn({ description: isChecked })}
                  defaultChecked={this.props.columns.description}
                />
              }
            />
            <ListItem
              primaryText="Origine"
              leftCheckbox={
                <Checkbox
                  onCheck={(e, isChecked) => this.props.filterColumn({ origin: isChecked })}
                  defaultChecked={this.props.columns.origin}
                />
              }
            />
            <ListItem
              primaryText="Biologique"
              leftCheckbox={
                <Checkbox
                  onCheck={(e, isChecked) => this.props.filterColumn({ bio: isChecked })}
                  defaultChecked={this.props.columns.bio}
                />
              }
            />
          </List>
          <Divider />
        </Drawer>
        {this.state.showFilters &&
          <Filters onSubmit={(filters) => this.onFilters(filters)} />}
        {this.props.hasFetched &&
          <div style={{ paddingBottom: 48 }}>
            <ProductList
              headers={displayedHeaders}
              items={this.props.items}
              columns={this.props.columns}
              sortByColumn={(by) => this.onSort(by)}
              onSubmit={(id, model) => this.submit(id, model)}
            />
            <Pagination
              page={this.state.page} totalPages={Math.ceil(this.props.total / 20)}
              onClickPaginate={(toPage) => this.onPaginate(toPage)}
            />
          </div>}
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
