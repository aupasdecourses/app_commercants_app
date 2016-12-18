import React, { PropTypes } from 'react';

import { RaisedButton } from 'material-ui';
import Left from 'material-ui/svg-icons/navigation/chevron-left';
import Right from 'material-ui/svg-icons/navigation/chevron-right';

import './Pagination.css';

const Pagination = ({ page, totalPages, onClickPaginate }) => {
  function onPaginate(toPage) {
    onClickPaginate(toPage);
  }

  return (
    <div className="pagination">
      <RaisedButton
        className="pager leftBtn"
        disabled={page === 1}
        onTouchTap={() => onPaginate(page - 1)}
      >
        <Left />
      </RaisedButton>
      <div className="current">
        {page} / {totalPages}
      </div>
      <RaisedButton
        className="pager rightBtn"
        disabled={page === totalPages}
        onTouchTap={() => onPaginate(page + 1)}
      >
        <Right />
      </RaisedButton>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  onClickPaginate: PropTypes.func,
};

export default Pagination;
