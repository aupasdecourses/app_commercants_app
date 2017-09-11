import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import * as Actions from '../../actions/order';
import Show from '../../components/Order/Show';

class ShowPage extends Component {
  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.id);
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
