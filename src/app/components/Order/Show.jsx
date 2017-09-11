import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import { Row, Col } from 'react-flexbox-grid/lib';

// TODO: Transform to pure
class Show extends Component {
  render() {
    const { item } = this.props;

    return (
      <div>
        <Row>
          <Col xs={12}>
            <p>Commande N°: { item.increment_id }</p>
            <p>Statut: { item.status }</p>
            <p>Client: { `${item.customer_firstname} ${item.customer_lastname}` }</p>
            <p>Prise de Commande: { item.created_at }</p>
            <p>Date de Livraison: { item.ddate }</p>
            <p>Creneau de Livraison: { item.dtime }</p>
            <p>Remplacement équivalent: { item.produit_equivalent === 1 ? 'Oui' : 'Non' }</p>
            <p>Adresse de Livraison: { `${item.street} ${item.postcode} ${item.city}` }</p>
            <p>Telephone: { item.telephone }</p>
            <p>Batiment & Etage: Bat: { item.batiment }, Etage: { item.etage }</p>
            <p>Codes porte: Code Porte 1: { item.codeporte1 }, Code Porte 2: { item.codeporte2 }</p>
            <p>Infos Complémentaires: { item.infoscomplementaires }</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Table style={{ width: '100%' }}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Nom</TableHeaderColumn>
                  <TableHeaderColumn>Qtt</TableHeaderColumn>
                  <TableHeaderColumn>Desc</TableHeaderColumn>
                  <TableHeaderColumn>Prix</TableHeaderColumn>
                  <TableHeaderColumn>Total</TableHeaderColumn>
                  <TableHeaderColumn>Comment</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
              {item.items.map(product => (
                <TableRow key={product.item_id}>
                  {this.context.role === 'ROLE_ADMIN' || product.commercant === 1 && <div></div>}
                  <TableRowColumn>{ product.name }</TableRowColumn>
                  <TableRowColumn>{ product.qty_ordered }</TableRowColumn>
                  <TableRowColumn>{ product.short_description }</TableRowColumn>
                  <TableRowColumn>{ product.price_incl_tax }</TableRowColumn>
                  <TableRowColumn>{ product.row_total_incl_tax }</TableRowColumn>
                  <TableRowColumn>{ product.item_comment }</TableRowColumn>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

Show.propTypes = {
  item: PropTypes.object,
};

export default Show;
