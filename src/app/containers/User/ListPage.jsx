import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { FloatingActionButton } from 'material-ui';
import ContentAddIcon from 'material-ui/svg-icons/content/add';

import * as UserActions from '../../actions/user';
import List from '../../components/User/List';

class ListPage extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <FloatingActionButton
          className="floatButton"
          containerElement={<Link to="/users/new" />}
        >
          <ContentAddIcon />
        </FloatingActionButton>
        {this.props.hasFetched &&
          <List items={this.props.items} />}
      </div>
    );
  }
}

ListPage.propTypes = {
  items: PropTypes.array,
  fetchUsers: PropTypes.func,
  hasFetched: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    items: state.users.items,
    hasFetched: state.users.hasFetched,
  };
}

const mapDispatchToProps = UserActions;

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
