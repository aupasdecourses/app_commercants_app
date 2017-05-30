import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import * as Actions from '../../actions/order';
import Show from '../../components/Order/Show';

class ShowPage extends Component {
  componentDidMount() {
    if (this.context.role !== 'ROLE_ADMIN') {
      setTimeout(
        () => {
          window.Tawk_API.showWidget();
        }, 2000);
    }
    this.props.fetchOrder(this.props.params.id);
  }

  componentWillUnmount() {
    if (this.context.role !== 'ROLE_ADMIN') {
      window.Tawk_API.hideWidget();
    }
  }

  render() {
    return (
      <Grid id="content" fluid>
        {this.props.hasFetched && <Show
          item={this.props.item}
        />}
      </Grid>
    );
  }
}

ShowPage.contextTypes = {
  role: PropTypes.string,
};

ShowPage.propTypes = {
  params: PropTypes.object,
  item: PropTypes.object,
  fetchOrder: PropTypes.func,
  hasFetched: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    item: state.order.item,
    hasFetched: state.order.hasFetched,
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(Actions, dispatch),
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);
