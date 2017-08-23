import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formsy-react';

import { FloatingActionButton, } from 'material-ui';
import Save from 'material-ui/svg-icons/content/save';
import { Row, Col } from 'react-flexbox-grid/lib';

import TextInput from './Form/TextInput';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notValid: true,
    };

    this.onValid = this.onValid.bind(this);
    this.onInvalid = this.onInvalid.bind(this);
    this.submit = this.submit.bind(this);
  }

  onValid() {
    this.setState({ notValid: false });
  }

  onInvalid() {
    this.setState({ notValid: true });
  }

  submit(model) {
    this.props.onSubmit(model);
  }

  render() {
    const { profile } = this.props;

    return (
      <Form
        onValidSubmit={this.submit}
        onValid={this.onValid}
        onInvalid={this.onInvalid}
      >
        <FloatingActionButton
          style={{ position: 'fixed', zIndex: 2, bottom: 20, right: 20 }}
          type="submit"
        >
          <Save />
        </FloatingActionButton>
        <Row>
          <Col xs={12} sm={6}>
            <TextInput
              name="firstName"
              floatingLabelText="Prénom"
              initialValue={profile.first_name}
              fullWidth
            />
            <TextInput
              name="lastName"
              floatingLabelText="Nom"
              initialValue={profile.last_name}
              fullWidth
            />
            <TextInput
              name="shopName"
              floatingLabelText="Magasin"
              initialValue={profile.shop_name}
              fullWidth
            />
            <TextInput
              name="email"
              floatingLabelText="Email"
              initialValue={profile.email}
              fullWidth
            />
            <TextInput
              name="phone"
              floatingLabelText="Téléphone"
              initialValue={profile.phone}
              fullWidth
            />
            <TextInput
              name="mobile"
              floatingLabelText="Mobile"
              initialValue={profile.mobile}
              fullWidth
            />
          </Col>
          <Col xs={12} sm={6}>
            <TextInput
              name="address"
              floatingLabelText="Adresse"
              initialValue={profile.address}
              multiLine
              fullWidth
            />
            <TextInput
              name="zip"
              floatingLabelText="Code postal"
              initialValue={profile.zip}
              fullWidth
            />
            <TextInput
              name="city"
              floatingLabelText="Ville"
              initialValue={profile.city}
              fullWidth
            />
          </Col>
        </Row>
      </Form>
    );
  }
}


Profile.propTypes = {
  profile: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default Profile;
