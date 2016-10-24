import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Grid } from 'react-flexbox-grid/lib';

import Form from '../../components/User/Form';
import * as UserActions from '../../actions/user';

class EditPage extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.params.id);
  }

  submit(model) {
    this.props.saveUser(this.props.params.id, model);
  }

  render() {
    return (
      <Grid fluid>
        {this.props.hasFetched && <Form
          item={this.props.item}
          isLoading={this.props.isFetching}
          onSubmit={(model) => this.submit(model)}
        />}
      </Grid>
    );
  }
}

EditPage.propTypes = {
  item: PropTypes.object,
  fetchUser: PropTypes.func,
  saveUser: PropTypes.func,
  hasFetched: PropTypes.bool,
  isFetching: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    item: state.user.item,
    hasFetched: state.user.hasFetched,
    isFetching: state.user.isFetching,
  };
}

const mapDispatchToProps = UserActions;

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
