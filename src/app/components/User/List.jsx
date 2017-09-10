import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import StoreIcon from 'material-ui/svg-icons/action/store';

const List = ({ items }) => {
  return (
    <Table
      selectable={false}
    >
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Username</TableHeaderColumn>
          <TableHeaderColumn>Email</TableHeaderColumn>
          {/* <TableHeaderColumn>Mobile</TableHeaderColumn>*/}
          <TableHeaderColumn>Produits</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody stripedRows displayRowCheckbox={false}>
        {items ?
          items.map(item => (
            <TableRow key={item.id} rowNumber={item.id}>
              <TableRowColumn>
                <Link to={`/users/${item.id}/edit`}>{item.username}</Link>
              </TableRowColumn>
              <TableRowColumn>{item.email}</TableRowColumn>
              {/* <TableRowColumn>{item.mobile}</TableRowColumn>*/}
              <TableRowColumn>
                <RaisedButton
                  containerElement={
                    <Link
                      to={{ pathname: '/products', search: `?commercant=${item.shop && item.shop.product_merchant}` }}
                    />
                  }
                  icon={<StoreIcon />}
                  secondary
                />
              </TableRowColumn>
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
