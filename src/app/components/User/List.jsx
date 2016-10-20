import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';

const List = ({ items }) => {
  return (
    <Table
      selectable={false}
    >
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Magasin</TableHeaderColumn>
          <TableHeaderColumn>Email</TableHeaderColumn>
          <TableHeaderColumn>Mobile</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody stripedRows displayRowCheckbox={false}>
        {items ?
          items.map(item => (
            <TableRow key={item.id} rowNumber={item.id}>
              <TableRowColumn>
                <Link to={`/users/${item.id}/edit`}>{item.shop_name}</Link>
              </TableRowColumn>
              <TableRowColumn>{item.email}</TableRowColumn>
              <TableRowColumn>{item.mobile}</TableRowColumn>
            </TableRow>
          )) :
          <TableRow><TableRowColumn>Aucun utilisateur</TableRowColumn></TableRow>
        }
      </TableBody>
    </Table>
  );
};

List.propTypes = {
  items: PropTypes.array,
};

export default List;
