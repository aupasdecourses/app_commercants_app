import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowDownwardIcon from 'material-ui/svg-icons/navigation/arrow-downward';

import InEdit from './InEdit';
import Publish from './Publish';

import './Table.css';

const ListTable = ({ items, fields, sortByColumn, onSubmit, primaryKey, checkboxes }) => {
  function renderField(field, value, id, name) {
    const type = field.type;

    let displayValue = value;

    if (field.values) {
      displayValue = field.values[value] || value;
    }

    if (type === 'publish') {
      return <Publish key={`${id}${name}`} name={name} onSubmit={(model) => onSubmit(id, model)}>{ value }</Publish>;
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
    } else if (type === 'actions') {
      return field.actions.map(action => {
        return (<RaisedButton
          onMouseUp={() => action.action(id)}
          label={action.title}
          style={{ minWidth: 48 }}
        />);
      });
    } else if (type === 'inEdit') {
      return <InEdit key={`${id}${name}`} name={name} onSubmit={(model) => onSubmit(id, model)}>{ value }</InEdit>;
    }

    return displayValue;
  }

  return (
    <Table
      selectable={checkboxes}
    >
      <TableHeader adjustForCheckbox={checkboxes} displaySelectAll={false}>
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
      <TableBody stripedRows displayRowCheckbox={checkboxes}>
        {items ?
          items.map(item => (
            <TableRow key={item.id} rowNumber={item.id}>
              { fields && Object.keys(fields).map((key) => (
                <TableRowColumn
                  style={fields[key].style}
                  key={`${item.id}${key}`}
                >
                  {renderField(fields[key], item[key], item[primaryKey], key)}
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

ListTable.defaultProps = {
  primaryKey: 'id',
  checkboxes: false,
};

ListTable.propTypes = {
  items: PropTypes.array,
  fields: PropTypes.object,
  sortByColumn: PropTypes.func,
  onSubmit: PropTypes.func,
  primaryKey: PropTypes.string,
  checkboxes: PropTypes.bool,
};

export default ListTable;
