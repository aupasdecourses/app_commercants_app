import React, { Component, PropTypes } from 'react';
import { Form } from 'formsy-react';

import { RaisedButton } from 'material-ui';

import TextInput from './Form/TextInput';

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
    this.props.onSubmit(model);
  }

  render() {
    return (
      <Form
        onValidSubmit={this.submit}
        onValid={this.onValid}
        onInvalid={this.onInvalid}
      >
        <TextInput
          name="username"
          hintText="Username de l'utilisateur"
          floatingLabelText="Username"
          fullWidth
          required
        />
        <TextInput
          name="email"
          hintText="Email de l'utilisateur"
          floatingLabelText="Email"
          fullWidth
          required
          validations="isEmail"
          validationError="L'email saisi n'est pas valide"
        />
        <RaisedButton
          primary
          type="submit"
          label="Créer"
          labelPosition="before"
          // icon={<Mail />}
          disabled={this.state.notValid}
        />
      </Form>
    );
  }
}

UserForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default UserForm;
