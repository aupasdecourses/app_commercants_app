import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { FloatingActionButton } from 'material-ui';
import ContentAddIcon from 'material-ui/svg-icons/content/add';

import * as UserActions from '../../actions/user';
import List from '../../components/User/List';
import Pagination from '../../components/Pagination';

class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  onPaginate(toPage) {
    const filters = {
      offset: toPage * 20,
    };

    this.props.fetchUsers(filters).then(() => {
      this.setState({ page: toPage });
    });
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
          <div>
            <List items={this.props.items} />
            <Pagination
              page={this.state.page} totalPages={Math.ceil(this.props.total / 20)}
              onClickPaginate={(toPage) => this.onPaginate(toPage)}
            />
          </div>}
      </div>
    );
  }
}

ListPage.propTypes = {
  items: PropTypes.array,
  total: PropTypes.number,
  fetchUsers: PropTypes.func,
  hasFetched: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    items: state.users.items,
    total: state.users.total,
    hasFetched: state.users.hasFetched,
  };
}

const mapDispatchToProps = UserActions;

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
