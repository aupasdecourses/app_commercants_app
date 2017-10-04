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

    return (
      <div>
        <Row>
          <Col xs={12}>
              <List>
                <Subheader>Informations Livraison</Subheader>
                <p className={"notice"}>En cas de doute pour un remplacement, de nombreux produits manquants ou pour toute autre question, merci de bien vouloir nous contacter</p>
                <RaisedButton label="09.72.50.90.69" secondary={true} href={"tel:09.72.50.90.69"} buttonStyle={{margin:"auto"}}/>
                <ListItem primaryText={ "Commande N° "+item.increment_id } />
                <ListItem primaryText={ `Client: ${item.customer_firstname} ${item.customer_lastname}` } />
                <ListItem primaryText={ "Remplacement équivalent: "+(item.produit_equivalent === 1 ? 'Oui' : 'Non') } />
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
              </List>
          </Col>
        </Row>
        <h2>Liste des produits commandées</h2>
        <Row>
          <Col xs={12}>
            <div className={"order_table"}>
            <Table className={"ot_header"} >
              <TableHeader adjustForCheckbox={false} displaySelectAll={false} className={"order_table_header"}>
                <TableRow>
                  <TableHeaderColumn className={"ot_name ot_cell"}>Nom du produit</TableHeaderColumn>
                  <TableHeaderColumn className={"ot_qty ot_cell"}>Quantité</TableHeaderColumn>
                  <TableHeaderColumn className={"ot_desc ot_cell"}>Description</TableHeaderColumn>
                  <TableHeaderColumn className={"ot_price ot_cell"}>Prix unitaire</TableHeaderColumn>
                  <TableHeaderColumn className={"ot_total ot_cell"}>Total Ligne</TableHeaderColumn>
                  <TableHeaderColumn className={"ot_com ot_cell"}>Commentaires Clients</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody overflowX={"auto"} overflowY={"unset"} displayRowCheckbox={false} className={"ot_body"} stripedRows={true} showRowHover={true}>
              {item.items.map(product => (
                <TableRow key={product.item_id}>
                  {this.context.role === 'ROLE_ADMIN' || product.commercant === 1 && <div></div>}
                  <TableRowColumn className={"ot_name ot_cell"}>{ product.name }</TableRowColumn>
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
      </div>
    );
  }
}

Show.propTypes = {
  item: PropTypes.object,
};

export default Show;
