import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';

const List = ({ items, columns }) => {
  const priceUnit = {
    1: 'Pièce',
    2: 'Par Kg',
  };

  return (
    <Table
      selectable={false}
    >
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          {columns.name === 1 && <TableHeaderColumn onClick={() => onClick('name')}>Nom</TableHeaderColumn>}
          {columns.status === 1 ?
            <TableHeaderColumn onClick={() => onClick('status')}>Dispo.</TableHeaderColumn> : ''
          }
          {columns.price === 1 ?
            <TableHeaderColumn onClick={() => onClick('price')}>Prix</TableHeaderColumn> : ''
          }
          {columns.type === 1 ?
            <TableHeaderColumn onClick={() => onClick('type')}>Unité</TableHeaderColumn> : ''
          }
          {/* columns.description === 1 ?
           <TableHeaderColumn onClick={() => this.onClick('description')}>Description portion</TableHeaderColumn> : ''
           */}
          {/* columns.origin === 1 ?
           <TableHeaderColumn onClick={() => this.onClick('origin')}>Origine</TableHeaderColumn> : ''
           */}
        </TableRow>
      </TableHeader>
      <TableBody stripedRows displayRowCheckbox={false}>
        {items ?
          items.map(item => (
            <TableRow key={item.id} rowNumber={item.id}>
              {columns.name === 1 ?
                <TableRowColumn>
                  <Link to={`/products/${item.id}/edit`}>{item.name}</Link>
                </TableRowColumn> : ''
              }
              {columns.status === 1 ?
                <TableRowColumn>{item.available ? 'Oui' : 'Non'}</TableRowColumn> : ''
              }
              {columns.price === 1 ?
                <TableRowColumn>{item.price}</TableRowColumn> : ''
              }
              {columns.type === 1 ?
                <TableRowColumn>{priceUnit[item.price_unit]}</TableRowColumn> : ''
              }
              {/* columns.description === 1 ?
               <td>{item.description}</td> : ''
               */}
              {/* columns.origin === 1 ?
               <td>{item.origin}</td> : ''
               */}
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
  columns: PropTypes.object,
};

export default List;
