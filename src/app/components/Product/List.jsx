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
          {columns.name === 1 &&
            <TableHeaderColumn>Nom</TableHeaderColumn>
          }
          {columns.status === 1 &&
            <TableHeaderColumn>Dispo.</TableHeaderColumn>
          }
          {columns.price === 1 &&
            <TableHeaderColumn>Prix</TableHeaderColumn>
          }
          {columns.type === 1 &&
            <TableHeaderColumn>Unité</TableHeaderColumn>
          }
          {columns.portionNumber === 1 &&
           <TableHeaderColumn>Portion</TableHeaderColumn>
          }
          {columns.description === 1 &&
            <TableHeaderColumn>Description</TableHeaderColumn>
          }
          {columns.origin === 1 &&
           <TableHeaderColumn>Origine</TableHeaderColumn>
           }
        </TableRow>
      </TableHeader>
      <TableBody stripedRows displayRowCheckbox={false}>
        {items ?
          items.map(item => (
            <TableRow key={item.id} rowNumber={item.id}>
              {columns.name === 1 &&
                <TableRowColumn>
                  <Link to={`/products/${item.id}/edit`}>{item.name}</Link>
                </TableRowColumn>
              }
              {columns.status === 1 &&
                <TableRowColumn>{item.available ? 'Oui' : 'Non'}</TableRowColumn>
              }
              {columns.price === 1 &&
                <TableRowColumn>{item.price}</TableRowColumn>
              }
              {columns.type === 1 &&
                <TableRowColumn>{priceUnit[item.price_unit]}</TableRowColumn>
              }
              {columns.portionNumber === 1 &&
                <TableRowColumn>{item.portion_number}</TableRowColumn>
              }
              {columns.description === 1 &&
               <TableRowColumn>{item.short_description}</TableRowColumn>
              }
              {columns.origin === 1 &&
               <TableRowColumn>{item.origin}</TableRowColumn>
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
  columns: PropTypes.object,
};

export default List;
