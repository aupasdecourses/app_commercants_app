import React, { PropTypes } from 'react';

import { TextField, FloatingActionButton, } from 'material-ui';
import Save from 'material-ui/svg-icons/content/save';
import { Row, Col } from 'react-flexbox-grid/lib';

const Profile = ({ profile, onSave }) => (
  <Row>
    <FloatingActionButton
      onTouchTap={onSave}
      style={{ position: 'fixed', zIndex: 2, bottom: 20, right: 20 }}
    >
      <Save />
    </FloatingActionButton>
    <Col xs={12} sm={6}>
      <TextField
        name="firstName"
        floatingLabelText="Prénom"
        defaultValue={profile.firstName}
        fullWidth
      /><br />
      <TextField
        name="lastName"
        floatingLabelText="Nom"
        defaultValue={profile.lastName}
        fullWidth
      /><br />
      <TextField
        name="companyName"
        floatingLabelText="Société"
        defaultValue={profile.companyName}
        fullWidth
      /><br />
      <TextField
        name="email"
        floatingLabelText="Email"
        defaultValue={profile.email}
        fullWidth
      /><br />
      <TextField
        name="phone"
        floatingLabelText="Téléphone"
        defaultValue={profile.phone}
        fullWidth
      />
    </Col>
    <Col xs={12} sm={6}>
      <TextField
        name="address"
        floatingLabelText="Adresse"
        defaultValue={profile.address}
        multiLine
        fullWidth
      /><br />
      <TextField
        name="zip"
        floatingLabelText="Code postal"
        defaultValue={profile.zip}
        fullWidth
      /><br />
      <TextField
        name="city"
        floatingLabelText="Ville"
        defaultValue={profile.city}
        fullWidth
      /><br />
      <div>
        <h5>Country</h5>
        <div>{profile.country}</div>
      </div>
    </Col>
  </Row>
);

Profile.propTypes = {
  profile: PropTypes.object,
  onSave: PropTypes.func,
};

export default Profile;
