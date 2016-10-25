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
          {columns.name &&
            <TableHeaderColumn>Nom</TableHeaderColumn>
          }
          {columns.status &&
            <TableHeaderColumn>Dispo.</TableHeaderColumn>
          }
          {columns.price &&
            <TableHeaderColumn>Prix</TableHeaderColumn>
          }
          {columns.type &&
            <TableHeaderColumn>Unité</TableHeaderColumn>
          }
          {columns.portionNumber &&
           <TableHeaderColumn>Portion</TableHeaderColumn>
          }
          {columns.description &&
            <TableHeaderColumn>Description</TableHeaderColumn>
          }
          {columns.origin &&
           <TableHeaderColumn>Origine</TableHeaderColumn>
           }
          {columns.bio &&
          <TableHeaderColumn>Bio</TableHeaderColumn>
          }
        </TableRow>
      </TableHeader>
      <TableBody stripedRows displayRowCheckbox={false}>
        {items ?
          items.map(item => (
            <TableRow key={item.id} rowNumber={item.id}>
              {columns.name &&
                <TableRowColumn>
                  <Link to={`/products/${item.id}/edit`}>{item.name}</Link>
                </TableRowColumn>
              }
              {columns.status &&
                <TableRowColumn>{item.available ? 'Oui' : 'Non'}</TableRowColumn>
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
              <TableRowColumn>{item.bio ? 'Oui' : 'Non'}</TableRowColumn>
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
