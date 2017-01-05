import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';

const List = ({ items, columns, sortColumn }) => {

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
          {columns.status &&
            <TableHeaderColumn
              onTouchTap={() => sortColumn('available')} style={{ width: 30 }}
            >Dispo.</TableHeaderColumn>
          }
          {columns.name &&
            <TableHeaderColumn
              onTouchTap={() => sortColumn('name')} style={{ width: '30%' }}
            >Nom</TableHeaderColumn>
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
           <TableHeaderColumn onTouchTap={() => sortColumn('origin')}>Origine</TableHeaderColumn>
           }
          {columns.bio &&
          <TableHeaderColumn
            onTouchTap={() => sortColumn('bio')} style={{ width: 30 }}
          >Bio</TableHeaderColumn>
          }
        </TableRow>
      </TableHeader>
      <TableBody stripedRows displayRowCheckbox={false}>
        {items ?
          items.map(item => (
            <TableRow key={item.id} rowNumber={item.id}>
              {columns.status &&
                <TableRowColumn style={{ width: 30 }}>{item.available ? 'Oui' : 'Non'}</TableRowColumn>
              }
              {columns.name &&
                <TableRowColumn style={{ width: '30%' }}>
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
              <TableRowColumn style={{ width: 30 }}>{item.bio ? 'Oui' : 'Non'}</TableRowColumn>
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
  sortColumn: PropTypes.func,
};

export default List;
