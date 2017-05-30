import React, { Component, PropTypes } from 'react';

import { Row, Col } from 'react-flexbox-grid/lib';

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
            <p>Date de Livraison: { item.increment_id } ??</p>
            <p>Creneau de Livraison: { item.increment_id } ??</p>
            <p>Remplacement équivalent: { item.increment_id } ??</p>
            <p>Adresse de Livraison: { item.increment_id } ??</p>
            <p>Telephone: { item.increment_id } ??</p>
            <p>Batiment & Etage: Bat: { item.increment_id } ??, Etage: { item.increment_id } ??</p>
            <p>Codes porte: Code Porte 1: { item.increment_id } -, Code Porte 2: { item.increment_id } ??</p>
            <p>Infos Complémentaires: { item.increment_id } ??</p>
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
