import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import { Row, Col } from 'react-flexbox-grid/lib';

import './Order.css';

// TODO: Transform to pure
class Show extends Component {
  render() {
    const { item } = this.props;
    console.log(item.items[0])
    return (
      <div>
        <Row>
          <Col xs={12} md={6}>
              <List>
                <Subheader>Informations Livraison</Subheader>
                <ListItem primaryText={ "Commande N° "+item.increment_id } />
                <ListItem primaryText={ `Client: ${item.customer_firstname} ${item.customer_lastname}` } />
                <ListItem primaryText={ "Remplacement équivalent: "+(item.produit_equivalent === 1 ? 'Oui' : 'Non') } />
              </List>
          </Col>
          <Col xs={12} md={6}>
              <ListItem
                  primaryText="Plus d'info"
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem
                      key={1}
                      primaryText={"Status: "+item.status}
                    />,
                    <ListItem
                      key={2}
                      primaryText={ "Date de livraison: "+item.ddate }
                    />,
                    <ListItem
                      key={3}
                      primaryText={ "Prise de commande le "+item.created_at }
                    />,
                  ]}
                />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Subheader>Liste des produits commandées</Subheader>
            <div className={"order_table"}>
              <Table className={"ot_header"} >
                <TableHeader adjustForCheckbox={false} displaySelectAll={false} className={"order_table_header"}>
                  <TableRow>
                    <TableHeaderColumn className={"ot_name ot_cell"}>Nom du produit</TableHeaderColumn>
                    {this.context.role === 'ROLE_ADMIN' &&
                      <TableHeaderColumn className={"ot_commercant ot_cell"}>Commercant</TableHeaderColumn>
                    }
                    <TableHeaderColumn className={"ot_qty ot_cell"}>Quantité</TableHeaderColumn>
                    <TableHeaderColumn className={"ot_desc ot_cell"}>Description</TableHeaderColumn>
                    <TableHeaderColumn className={"ot_price ot_cell"}>Prix unitaire</TableHeaderColumn>
                    <TableHeaderColumn className={"ot_total ot_cell"}>Total Ligne</TableHeaderColumn>
                    <TableHeaderColumn className={"ot_com ot_cell"}>Commentaires Clients</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} className={"ot_body"} stripedRows={true} showRowHover={true}>
                {item.items.map(product => (
                  <TableRow key={product.item_id}>
                    <TableRowColumn className={"ot_name ot_cell"}>{ product.name }</TableRowColumn>
                    {this.context.role === 'ROLE_ADMIN' &&
                      <TableRowColumn className={"ot_commercant ot_cell"}>{ product.commercant }</TableRowColumn>
                    }
                    <TableRowColumn className={"ot_qty ot_cell"}>{ Math.round(product.qty_ordered)+" x" }</TableRowColumn>
                    <TableRowColumn className={"ot_desc ot_cell"}>{ product.short_description }</TableRowColumn>
                    <TableRowColumn className={"ot_price ot_cell"}>{ Math.round(product.price_incl_tax*100)/100+"€" }</TableRowColumn>
                    <TableRowColumn className={"ot_total ot_cell"}>{ Math.round(product.row_total_incl_tax*100)/100+"€" }</TableRowColumn>
                    <TableRowColumn className={"ot_com ot_cell"}>{ product.item_comment }</TableRowColumn>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={5}>
            <p className={"notice"}>En cas de doute pour un remplacement, de nombreux produits manquants ou pour toute autre question, merci de bien vouloir nous contacter</p>
          </Col>
          <Col xs={12} md={2}>
            <div className={"phonebutton"} >
              Nous appeler au <RaisedButton label="09.72.50.90.69" primary={true} href={"tel:09.72.50.90.69"} />
            </div>
          </Col>
          <Col md={5}/>
        </Row>
      </div>
    );
  }
}

Show.contextTypes = {
  role: PropTypes.string,
};

Show.propTypes = {
  item: PropTypes.object,
};

export default Show;
