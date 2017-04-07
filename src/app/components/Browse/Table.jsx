import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import ArrowDownwardIcon from 'material-ui/svg-icons/navigation/arrow-downward';

import './Table.css';

const ListTable = ({ items, fields, sortByColumn, onSubmit }) => {
  function renderField(field, value, id, name) {
    const type = field.type;

    if (type === 'publish') {
      const publish = {};

      publish[name] = !value;

      return (<RaisedButton
        onMouseUp={(e) => onSubmit(id, publish)}
        style={{ minWidth: 48 }}
        icon={value ? <CheckCircleIcon /> : <CancelIcon />}
        backgroundColor={value ? '#b9d466' : '#dc8585'}
      />);
    } else if (type === 'date') {
      return moment(value).format('LL');
    } else if (type === 'title') {
      return <Link to={`/${field.baseRoute}/${id}/edit`}>{value}</Link>;
    } else if (type === 'link') {
      return <Link to={field.link}>{value}</Link>;
    } else if (type === 'entity') {
      return value ? value[field.typeName || 'name'] : '';
    } else if (type === 'upload') {
      return <img src={`${field.baseUrl}/${id}/${value}`} alt="" style={{ maxHeight: '48px' }} />;
    }

    return value;
  }

  return (
    <Table
      selectable={false}
    >
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          { fields && Object.keys(fields).map((key) => (
            <TableHeaderColumn
              style={fields[key].style}
              key={key}
            >
              {fields[key].sortable ?
                <div
                  onMouseUp={(e) => sortByColumn(key)}
                  className="rowAlign sort"
                >
                  <ArrowDownwardIcon
                    style={{ withd: 16, height: 16 }}
                    className={`sortIcon${fields[key].sortBy ? ` active ${fields[key].sortBy}` : ''}`}
                    id={key}
                  />
                  { fields[key].alias }
                </div> :
                <div className="rowAlign">
                  { fields[key].alias }
                </div>
              }
            </TableHeaderColumn>
          )) }
        </TableRow>
      </TableHeader>
      <TableBody stripedRows displayRowCheckbox={false}>
        {items ?
          items.map(item => (
            <TableRow key={item.id} rowNumber={item.id}>
              { fields && Object.keys(fields).map((key) => (
                <TableRowColumn
                  style={fields[key].style}
                  key={key}
                >
                  {renderField(fields[key], item[key], item.id, key)}
                </TableRowColumn>
              )) }
            </TableRow>
          )) :
          <TableRow><TableRowColumn>Aucun élément</TableRowColumn></TableRow>
        }
      </TableBody>
    </Table>
  );
};

ListTable.propTypes = {
  items: PropTypes.array,
  fields: PropTypes.object,
  columns: PropTypes.object,
  sortByColumn: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ListTable;
