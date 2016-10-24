import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {
  Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle
} from 'material-ui/Toolbar';
import { FloatingActionButton, RaisedButton } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';
import FormatLineIcon from 'material-ui/svg-icons/editor/format-line-spacing';
import ActionSettingsIcon from 'material-ui/svg-icons/action/settings';

import * as ProductActions from '../../actions/product';
import Filters from '../../components/Product/Filters';
import List from '../../components/Product/List';

class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: {
        status: 1,
        name: 1,
        type: 1,
        price: 1,
        portionNumber: 1,
        description: 0,
        origin: 0,
      },
      showFilters: false,
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
              containerElement={<Link to="/products/settings" />}
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
        {this.state.showFilters &&
          <Filters onSubmit={(filters) => this.onFilters(filters)} />}
        {this.props.hasFetched &&
          <List items={this.props.items} columns={this.state.columns} />}
      </div>
    );
  }
}

ListPage.contextTypes = {
  role: PropTypes.string,
  muiTheme: PropTypes.object.isRequired,
};

ListPage.propTypes = {
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
