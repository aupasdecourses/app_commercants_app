import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <div id="content" className="paginate">
          <FloatingActionButton
            className="floatButton"
            containerElement={<Link to="/users/new" />}
          >
            <ContentAddIcon />
          </FloatingActionButton>
          {this.props.hasFetched &&
          <List items={this.props.items} />}
        </div>
        <Pagination
          page={this.state.page} totalPages={Math.ceil(this.props.total / 20)}
          onClickPaginate={(toPage) => this.onPaginate(toPage)}
        />
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
