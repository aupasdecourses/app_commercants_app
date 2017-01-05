import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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
import FormatLineIcon from 'material-ui/svg-icons/editor/format-line-spacing';
import ActionSettingsIcon from 'material-ui/svg-icons/action/settings';

import * as ProductActions from '../../actions/product';
import Filters from '../../components/Product/Filters';
import ProductList from '../../components/Product/List';
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

  onFilters(filters) {
    this.props.fetchProducts(filters).then(() => {
      this.setState({ filters });
    });
  }

  onSort(sortBy) {
    console.log(this.state.sort);

    let sortDir = 'asc';

    if (sortBy === this.state.sort.by && this.state.sort.dir === 'asc') {
      sortDir = 'desc';
    }

    const filters = {
      ...this.state.filters,
      sortBy,
      sortDir,
    };

    this.props.fetchProducts(filters).then(() => {
      this.setState({
        filters,
        sort: {
          by: sortBy,
          dir: sortDir,
        },
      });
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

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup >
            <ToolbarTitle text="Liste produits" />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text="Filtres" />
            <FormatLineIcon
              style={{ cursor: 'pointer', paddingLeft: 24, marginTop: 16 }}
              color={this.context.muiTheme.toolbar.iconColor}
              hoverColor={this.context.muiTheme.toolbar.hoverColor}
              onClick={() => this.setState({ showFilters: !this.state.showFilters })}
            />
            <ToolbarSeparator />
            <RaisedButton
              onTouchTap={() => this.setState({ showOptions: !this.state.showOptions })}
              label="Options"
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
                  onCheck={(e, isChecked) => this.props.filterColumn({ status: isChecked })}
                  defaultChecked={this.props.columns.status}
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
              items={this.props.items} columns={this.props.columns}
              sortColumn={(sortBy) => this.onSort(sortBy)}
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
  location: PropTypes.object,
  items: PropTypes.array,
  total: PropTypes.number,
  columns: PropTypes.object,
  fetchProducts: PropTypes.func,
  filterColumn: PropTypes.func,
  hasFetched: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    items: state.products.items,
    total: state.products.total,
    columns: state.products.columns,
    hasFetched: state.products.hasFetched,
  };
}

const mapDispatchToProps = ProductActions;

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
