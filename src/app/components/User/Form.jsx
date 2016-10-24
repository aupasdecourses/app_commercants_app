import React, { Component, PropTypes } from 'react';
import { Form } from 'formsy-react';

import { FloatingActionButton, MenuItem } from 'material-ui';
import SaveIcon from 'material-ui/svg-icons/content/save';
import SelectInput from 'formsy-material-ui/lib/FormsySelect';
import { Row, Col } from 'react-flexbox-grid/lib';

import TextInput from '../Form/TextInput';

class UserForm extends Component {
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
    const newModel = {
      ...model,
      roles: [
        model.roles
      ],
    };

    this.props.onSubmit(newModel);
  }

  render() {
    const { item, isLoading } = this.props;

    return (
      <Form
        onValidSubmit={this.submit}
        onValid={this.onValid}
        onInvalid={this.onInvalid}
      >
        <FloatingActionButton
          className="floatButton"
          disabled={this.state.notValid || isLoading}
          secondary
          type="submit"
        >
          <SaveIcon />
        </FloatingActionButton>
        <Row>
          <Col xs={12} sm={6}>
            <h4>Information de connexion</h4>
            <TextInput
              name="username"
              hintText="Login de l'utilisateur"
              floatingLabelText="Username"
              initialValue={item.username}
              fullWidth
              required
              disabled={isLoading}
            />
            <SelectInput
              name="roles"
              hintText="Le role de l'utilisateur"
              floatingLabelText="Role"
              value={item.roles && item.roles[0]}
              fullWidth
              required
              multiple
              disabled={isLoading}
            >
              <MenuItem value="ROLE_USER" primaryText="Commerçant" />
              <MenuItem value="ROLE_ADMIN" primaryText="Admin" />
            </SelectInput>
            <TextInput
              name="plainPassword[first]"
              hintText="Uniquement si vous souhaitez changer le mot de passe"
              floatingLabelText="Nouveau mot de passe"
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="plainPassword[second]"
              hintText="Confirmer le nouveau mot de passe"
              floatingLabelText="Confirmation mot de passe"
              fullWidth
              disabled={isLoading}
            />
            <h4>Utilisateur</h4>
            <TextInput
              name="firstName"
              hintText="Prénom du gérant"
              floatingLabelText="Prénom"
              initialValue={item.first_name}
              fullWidth
              required
              disabled={isLoading}
            />
            <TextInput
              name="lastName"
              hintText="Nom du gérant"
              floatingLabelText="Nom"
              initialValue={item.last_name}
              fullWidth
              required
              disabled={isLoading}
            />
            <TextInput
              name="email"
              hintText="Email de l'utilisateur"
              floatingLabelText="Email"
              initialValue={item.email}
              fullWidth
              required
              validations="isEmail"
              validationError="L'email saisi n'est pas valide"
              disabled={isLoading}
            />
            <TextInput
              name="phone"
              hintText="Téléphone fixe"
              floatingLabelText="Téléphone"
              initialValue={item.phone}
              fullWidth
              required
              disabled={isLoading}
            />
            <TextInput
              name="mobile"
              hintText="Téléphone portable"
              floatingLabelText="Mobile"
              initialValue={item.mobile}
              fullWidth
              required
              disabled={isLoading}
            />
          </Col>
          <Col xs={12} sm={6}>
            <h4>Magasin</h4>
            <TextInput
              name="shopName"
              hintText="Nom du magasin"
              floatingLabelText="Magasin"
              initialValue={item.shop_name}
              fullWidth
              required
              disabled={isLoading}
            />
            <TextInput
              name="address"
              hintText="Adresse du magasin"
              floatingLabelText="Adresse"
              initialValue={item.address}
              fullWidth
              required
              disabled={isLoading}
            />
            <TextInput
              name="zip"
              hintText="Code postal"
              floatingLabelText="Code postal"
              initialValue={item.zip}
              fullWidth
              required
              disabled={isLoading}
            />
            <TextInput
              name="city"
              hintText="Ville"
              floatingLabelText="Ville"
              initialValue={item.city}
              fullWidth
              required
              disabled={isLoading}
            />
          </Col>
        </Row>


      </Form>
    );
  }
}

UserForm.propTypes = {
  item: PropTypes.object,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default UserForm;
