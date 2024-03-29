import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FlatButton, RaisedButton, TextField } from 'material-ui';
import Left from 'material-ui/svg-icons/navigation/chevron-left';
import Right from 'material-ui/svg-icons/navigation/chevron-right';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

import './Pagination.css';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goTo: false,
    };
  }

  onPaginate(toPage) {
    if (toPage > 0 && toPage <= this.props.totalPages) {
      this.props.onClickPaginate(toPage);
    }
  }

  render() {
    const { page, totalPages } = this.props;

    return (
      <div
        className="pagination"
      >
        {!this.state.goTo ?
          <div>
            <RaisedButton
              className="pager leftBtn"
              disabled={page === 1}
              onTouchTap={() => this.onPaginate(page - 1)}
            >
              <Left />
            </RaisedButton>
            <div
              onTouchTap={() => this.setState({ goTo: true })}
              className="current"
            >
              {page} / {totalPages}
            </div>
            <RaisedButton
              className="pager rightBtn"
              disabled={page === totalPages}
              onTouchTap={() => this.onPaginate(page + 1)}
            >
              <Right />
            </RaisedButton>
          </div> :
          <div>
            <TextField
              ref={(c) => { this.toPage = c; }}
              type="number"
              style={{ lineHeight: '12px', height: 34, width: 60, marginLeft: 24 }}
              inputStyle={{ textAlign: 'center' }}
              hintText="Page ?"
            />
            <FlatButton
              onTouchTap={() => { this.onPaginate(this.toPage.input.value); this.setState({ goTo: false }); }}
              label="Go" labelPosition="before" secondary
            >
              <ArrowForward />
            </FlatButton>
          </div>
        }
      </div>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  onClickPaginate: PropTypes.func,
};

export default Pagination;
