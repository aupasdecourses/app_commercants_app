import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import ArrowDownwardIcon from 'material-ui/svg-icons/navigation/arrow-downward';

import '../../components/Table/ApiTable.css';

const List = ({ items, headers, columns, sortByColumn, onSubmit }) => {
  const priceUnit = {
    1: 'Kg',
    2: 'Pièce',
  };

  return (
    <Table
      selectable={false}
    >
      <TableHeader
        adjustForCheckbox={false} displaySelectAll={false}
      >
        <TableRow>
          { headers && Object.keys(headers).map((key) => (
            <TableHeaderColumn
              style={headers[key].style}
              key={key}
            >
              {headers[key].sortable ?
                <div
                  onMouseUp={(e) => sortByColumn(key)}
                  className="rowAlign sort"
                >
                  <ArrowDownwardIcon
                    style={{ withd: 16, height: 16 }}
                    className={`sortIcon${headers[key].sortBy ? ` active ${headers[key].sortBy}` : ''}`}
                    id={key}
                  />
                  { headers[key].alias }
                </div> :
                <div className="rowAlign">
                  { headers[key].alias }
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
              {columns.available &&
                <TableRowColumn style={{ width: 64 }}>
                  <RaisedButton
                    onMouseUp={(e) => onSubmit(item.id, { available: !item.available })}
                    style={{ minWidth: 64 }}
                    icon={item.available ? <CheckCircleIcon /> : <CancelIcon />}
                    backgroundColor={item.available ? "#b9d466" : "#dc8585"}
                  />
                </TableRowColumn>
              }
              {columns.name &&
                <TableRowColumn style={{ fontSize: '14px' }}>
                  <Link to={`/products/${item.id}/edit`}>{item.name}</Link>
                </TableRowColumn>
              }
              {columns.price &&
                <TableRowColumn>{item.price}</TableRowColumn>
              }
              {columns.type &&
                <TableRowColumn>{priceUnit[item.price_unit]}</TableRowColumn>
              }
              {columns.portionNumber &&
                <TableRowColumn>{item.portion_number}</TableRowColumn>
              }
              {columns.description &&
               <TableRowColumn>{item.short_description}</TableRowColumn>
              }
              {columns.origin &&
               <TableRowColumn>{item.origin}</TableRowColumn>
              }
              {columns.bio &&
              <TableRowColumn style={{ width: 42 }}>{item.bio ? 'Oui' : 'Non'}</TableRowColumn>
              }
            </TableRow>
          )) :
          <TableRow><TableRowColumn>Aucun produit</TableRowColumn></TableRow>
        }
      </TableBody>
    </Table>
  );
};

List.propTypes = {
  items: PropTypes.array,
  headers: PropTypes.object,
  columns: PropTypes.object,
  sortByColumn: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default List;
