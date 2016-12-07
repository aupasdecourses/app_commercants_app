import React, { Component, PropTypes } from 'react';
import { Form as BaseForm } from 'formsy-react';

import { FloatingActionButton, RaisedButton, MenuItem } from 'material-ui';
import Save from 'material-ui/svg-icons/content/save';
import ToggleInput from 'formsy-material-ui/lib/FormsyToggle';
import SelectInput from 'formsy-material-ui/lib/FormsySelect';
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
          <Col xs={12}>
            <ToggleInput
              name="available"
              label="Actif sur le site"
              defaultToggled={item.available}
              labelPosition="right"
              disabled={isLoading}
            />
            <ToggleInput
              name="selected"
              label="Dans la sélection du moment"
              defaultToggled={item.selected}
              labelPosition="right"
              disabled={isLoading}
            />
            <TextInput
              name="name"
              floatingLabelText="Nom de l’article"
              hintText="Nom affiché sur le site, exemple : Pizza 4 fromages"
              initialValue={item.name}
              fullWidth
              required
              disabled={isLoading}
            />
            <TextInput
              name="ref"
              floatingLabelText="Code article"
              hintText="Exemple : REF0054"
              initialValue={item.ref}
              fullWidth
              disabled={isLoading}
            />
            {this.context.role === 'ROLE_ADMIN' ?
              <TextInput
                name="sku"
                floatingLabelText="Référence APDC (SKU)"
                initialValue={item.sku}
                fullWidth
                required
                disabled={isLoading}
              /> :
              <div>
                {item.sku}
              </div>
            }
            <TextInput
              name="price"
              floatingLabelText="Prix"
              hintText="Prix en Euro"
              initialValue={item.price}
              fullWidth
              type="number"
              required
              disabled={isLoading}
            />
            <SelectInput
              name="priceUnit"
              floatingLabelText="Unité de prix"
              value={item.price_unit}
              fullWidth
              disabled={isLoading}
            >
              <MenuItem value={1} primaryText="Kg" />
              <MenuItem value={2} primaryText="Pièce" />
            </SelectInput>
            <TextInput
              name="shortDescription"
              floatingLabelText="Description"
              initialValue={item.short_description}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="portionWeight"
              floatingLabelText="Poids portion (g)"
              hintText="Poids en gramme"
              initialValue={item.portion_weight}
              fullWidth
              type="number"
              step="0.01"
              disabled={isLoading}
            />
            {/* <TextInput
              name="portionNumber"
              floatingLabelText="Nombre portion"
              initialValue={item.portion_number}
              fullWidth
              disabled={isLoading}
            /> */}
            <SelectInput
              name="tax"
              floatingLabelText="TVA"
              hintText="TVA applicable"
              value={item.tax}
              fullWidth
              disabled={isLoading}
            >
              <MenuItem value={1} primaryText="5.5%" />
              <MenuItem value={2} primaryText="10%" />
              <MenuItem value={3} primaryText="20%" />
            </SelectInput>
            <TextInput
              name="origin"
              floatingLabelText="Origine"
              initialValue={item.origin}
              fullWidth
              disabled={isLoading}
            />
            <SelectInput
              name="bio"
              floatingLabelText="Bio"
              hintText="Produit biologique ?"
              value={item.bio}
              fullWidth
              disabled={isLoading}
            >
              <MenuItem value={false} primaryText="Non" />
              <MenuItem value={true} primaryText="Oui" />
            </SelectInput>
            {this.context.role === 'ROLE_ADMIN' &&
              <TextInput
                name="user"
                floatingLabelText="Commerçant"
                initialValue={item.user && item.user.id}
                fullWidth
                disabled={isLoading}
              />
            }
          </Col>
          <Col xs={12}>
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

Form.contextTypes = {
  role: PropTypes.string,
};

Form.propTypes = {
  item: PropTypes.object,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  onUpload: PropTypes.func,
};

export default Form;
