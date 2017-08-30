import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
          {item.items.map(product => (
              <Col xs={12}>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <td>Nom</td>
                      <td>Qtt</td>
                      <td>Desc</td>
                      <td>Prix</td>
                      <td>Total</td>
                      <td>Comment</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{ product.name }</td>
                      <td>{ product.qty_ordered }</td>
                      <td>{ product.short_description }</td>
                      <td>{ product.price_incl_tax }</td>
                      <td>{ product.row_total_incl_tax }</td>
                      <td>{ product.item_comment }</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
          ))}
        </Row>
      </div>
    );
  }
}

Show.propTypes = {
  item: PropTypes.object,
};

export default Show;
