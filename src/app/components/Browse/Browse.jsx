import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import Toolbar from './Toolbar';
import Filters from './Filters'; //TODO: We should use definition, filterable: type
import Table from './Table';
import Options from './Options';
import Pagination from 'app/components/Pagination';

class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      showOptions: false,
      showFilters: false,
      sort: {
        by: 'id',
        dir: 'desc',
      },
      filters: props.filters,
    };
  }

  componentWillMount() {
    this.props.fetchItems(this.state.filters);
  }

  onFilters(filters) {
    this.props.fetchItems(filters).then(() => {
      this.setState({ filters });
    });
  }

  onSort(sortBy) {
    let sortDir = 'asc';
    if (sortBy === this.state.sort.by && this.state.sort.dir === 'asc') {
      sortDir = 'desc';
    }

    const filters = {
      ...this.state.filters,
      sortBy,
      sortDir,
    };

    this.props.fetchItems(filters).then(() => {
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
      ...this.state.filters,
      offset: (toPage - 1) * 20,
    };

    this.props.fetchItems(filters).then(() => {
      this.setState({ page: toPage });
    });
  }

  render() {
    const {
      title, definition, headers, items, totalItems, addRoute, filterHeader, onSubmit, boxed
    } = this.props;
    const sortBy = this.state.sort.by;
    const displayedFields = {};
    const filterable = {};

    if (definition[sortBy]) {
      definition[sortBy].sortBy = this.state.sort.dir;
    }

    Object.keys(definition).map((key) => {
      if (headers[key]) {
        displayedFields[key] = definition[key];
      }

      if (definition[key].filterable) {
        filterable[key] = definition[key];
      }

      return null;
    });

    return (
      <div>
        <div id={ !boxed && 'content' } className="paginate">
          {!boxed && <Toolbar
            title={title}
            onSearch={(filters) => this.onFilters(filters)}
            toggleFilters={
              Object.getOwnPropertyNames(filterable).length !== 0
                ? () => this.setState({ showFilters: !this.state.showFilters })
                : null
            }
            toggleOptions={() => this.setState({ showOptions: !this.state.showOptions })}
          />}
          {addRoute && <FloatingActionButton
            className="floatButton"
            containerElement={<Link to={addRoute} />}
          >
            <AddIcon />
          </FloatingActionButton>}
          <Options
            open={this.state.showOptions}
            fields={definition} columns={headers}
            toggleOptions={() => this.setState({ showOptions: !this.state.showOptions })}
            showColumn={(column) => filterHeader(column)}
          />
          {this.state.showFilters &&
          <Filters
            definition={filterable}
            onSubmit={(filters) => this.onFilters(filters)}
          />}
          <Table
            fields={displayedFields}
            items={items} columns={headers}
            sortByColumn={(by) => this.onSort(by)}
            onSubmit={(id, model) => onSubmit(id, model)}
          />
        </div>
        {totalItems && <Pagination
          page={this.state.page} totalPages={Math.ceil(totalItems / 20)}
          onClickPaginate={(toPage) => this.onPaginate(toPage)}
        />}
      </div>
    );
  }
}

Browse.propTypes = {
  title: PropTypes.string,
  definition: PropTypes.object,
  headers: PropTypes.object,
  items: PropTypes.array,
  totalItems: PropTypes.number,
  addRoute: PropTypes.string,
  filters: PropTypes.object,
  boxed: PropTypes.bool,
  fetchItems: PropTypes.func,
  filterHeader: PropTypes.func,
  onSubmit: PropTypes.func,
};

Browse.defaultProps = {
  title: 'List',
  filters: null,
};

export default Browse;
