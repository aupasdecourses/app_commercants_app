import React, { PropTypes } from 'react';

import { RaisedButton } from 'material-ui';
import Left from 'material-ui/svg-icons/navigation/chevron-left';
import Right from 'material-ui/svg-icons/navigation/chevron-right';

import './Pagination.css';

const Pagination = () => {
  function onPaginate() {
    return;
  }

  return (
    <div className="pagination">
      <RaisedButton
        className="pager leftBtn"
        disabled
        onTouchTap={onPaginate}
      >
        <Left />
      </RaisedButton>
      <div className="current">
        {1} / {10}
      </div>
      <RaisedButton
        className="pager rightBtn"
        disabled={false}
        onTouchTap={onPaginate}
      >
        <Right />
      </RaisedButton>
    </div>
  );
};

Pagination.propTypes = {};

export default Pagination;
