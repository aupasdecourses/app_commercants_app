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

class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: {
        status: true,
        name: true,
        type: true,
        price: true,
        portionNumber: true,
        description: false,
        origin: false,
        bio: false,
      },
      showFilters: false,
      showOptions: false,
    };
  }

  componentWillMount() {
    if (this.props.location.query) {
      this.props.fetchProducts(this.props.location.query);
    } else {
      this.props.fetchProducts();
    }
  }

  onFilters(filters) {
    this.props.fetchProducts(filters);
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
              primaryText="Description"
              leftCheckbox={<Checkbox onCheck={(e, isChecked) => this.setState({ columns: { ...this.state.columns, description: isChecked } })} />}
              defaultChecked={this.state.columns.description}
            />
            <ListItem
              primaryText="Origine"
              leftCheckbox={<Checkbox onCheck={(e, isChecked) => this.setState({ columns: { ...this.state.columns, origin: isChecked } })} />}
              defaultChecked={this.state.columns.origin}
            />
            <ListItem
              primaryText="Biologique"
              leftCheckbox={<Checkbox onCheck={(e, isChecked) => this.setState({ columns: { ...this.state.columns, bio: isChecked } })} />}
              defaultChecked={this.state.columns.bio}
            />
          </List>
          <Divider />
        </Drawer>
        {this.state.showFilters &&
          <Filters onSubmit={(filters) => this.onFilters(filters)} />}
        {this.props.hasFetched &&
          <ProductList items={this.props.items} columns={this.state.columns} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
