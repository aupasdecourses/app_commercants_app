import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {
  Toolbar, ToolbarGroup, ToolbarTitle,
} from 'material-ui/Toolbar';
import { FloatingActionButton } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import ActionSettingsIcon from 'material-ui/svg-icons/action/settings';

import * as ProductActions from '../../actions/product';
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
        description: 1,
        origin: 1,
      }
    };

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.props.fetchProducts();
  }

  onClick(column) {
    const columns = this.state.columns;
    columns[column] = 0;

    this.setState({ columns });
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup >
            <ToolbarTitle text="Liste produits" />
          </ToolbarGroup>
          <ToolbarGroup>
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
          <ContentAddIcon />
        </FloatingActionButton>
        {this.props.hasFetched && <List items={this.props.items} columns={this.state.columns} />}
      </div>
    );
  }
}

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
