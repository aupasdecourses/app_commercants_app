import React, { Component, PropTypes } from 'react';
import { Form as BaseForm } from 'formsy-react';

import { FloatingActionButton, RaisedButton } from 'material-ui';
import Save from 'material-ui/svg-icons/content/save';
import ToggleInput from 'formsy-material-ui/lib/FormsyToggle';
import { Row, Col } from 'react-flexbox-grid/lib';

import TextInput from '../Form/TextInput';
import FileInput from '../Form/FileInput';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notValid: true,
    };

    this.onValid = this.onValid.bind(this);
    this.onInvalid = this.onInvalid.bind(this);
    this.submit = this.submit.bind(this);
    this.upload = this.upload.bind(this);
  }

  onValid() {
    this.setState({ notValid: false });
  }

  onInvalid() {
    this.setState({ notValid: true });
  }

  upload(file) {
    const formData = new FormData();

    if (!file.type.match('image.*')) {
      return;
    }

    formData.append('photoFile', file, file.name);

    this.props.onUpload(formData);
  }

  submit(model) {
    this.props.onSubmit(model);
  }

  render() {
    const { item, isLoading } = this.props;

    return (
      <BaseForm
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
          <Save />
        </FloatingActionButton>
        <Row>
          <Col xs={12} sm={9}>
            <TextInput
              name="name"
              floatingLabelText="Nom"
              hintText="Exemple : Pizza 4 fromages"
              initialValue={item.name}
              fullWidth
              required
              disabled={isLoading}
            />
            <TextInput
              name="ref"
              floatingLabelText="Référence"
              hintText="Exemple : REF0054"
              initialValue={item.ref}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="sku"
              floatingLabelText="SKU"
              initialValue={item.sku}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="price"
              floatingLabelText="Prix"
              hintText="Prix en Euro"
              initialValue={item.price}
              fullWidth
              type="number"
              disabled={isLoading}
            />
            <TextInput
              name="priceUnit"
              floatingLabelText="Unité de prix"
              initialValue={item.price_unit}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="shortDescription"
              floatingLabelText="Description"
              initialValue={item.short_description}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="portionWeight"
              floatingLabelText="Poids portion"
              initialValue={item.portion_weight}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="portionNumber"
              floatingLabelText="Nombre portion"
              initialValue={item.portion_number}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="tax"
              floatingLabelText="TVA"
              initialValue={item.tax}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="origin"
              floatingLabelText="Origine"
              initialValue={item.origin}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="bio"
              floatingLabelText="Bio"
              initialValue={item.bio}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="user"
              floatingLabelText="Marchant"
              initialValue={item.user && item.user.id}
              fullWidth
              disabled={isLoading}
            />
          </Col>
          <Col xs={12} sm={3}>
            <ToggleInput
              name="available"
              label="Disponible"
              defaultToggled={item.available}
              labelPosition="right"
              disabled={isLoading}
            />
            <ToggleInput
              name="selected"
              label="Sélection APDC"
              defaultToggled={item.selected}
              labelPosition="right"
              disabled={isLoading}
            />
            {item.id ?
              <RaisedButton
                containerElement="label"
                label="Photo"
              >
                <FileInput
                  name="photo" style={{ display: 'none' }}
                  setValue={this.upload}
                />
              </RaisedButton> : ''
            }
          </Col>
        </Row>
      </BaseForm>
    );
  }
}

Form.propTypes = {
  item: PropTypes.object,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  onUpload: PropTypes.func,
};

export default Form;
