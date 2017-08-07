import React, { Component, PropTypes } from 'react';
import { Form as BaseForm } from 'formsy-react';
import { Prompt } from 'react-router';

import { FloatingActionButton, RaisedButton, MenuItem } from 'material-ui';
import Save from 'material-ui/svg-icons/content/save';
import ToggleInput from 'formsy-material-ui/lib/FormsyToggle';
import SelectInput from 'formsy-material-ui/lib/FormsySelect';
import { Row, Col } from 'react-flexbox-grid/lib';

import globalConfig from '../../config';

import NumberInput from '../Form/NumberInput';
import TextInput from '../Form/TextInput';
import FileInput from '../Form/FileInput';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notValid: true,
      notSaved: false,
    };
  }

  onValid = () => {
    this.setState({ notValid: false });
  };

  onInvalid = () => {
    this.setState({ notValid: true });
  };

  onChange = (currentValues, isChanged) => {
    if (isChanged && !this.state.notSaved) {
      this.setState({ notSaved: true });
    }
  };

  upload = (file) => {
    const formData = new FormData();

    if (!file.type.match('image.*')) {
      return;
    }

    formData.append('photoFile', file, file.name);

    this.props.onUpload(formData);
  };

  submit= (model) => {
    this.setState({ notSaved: false }, () => {
      this.props.onSubmit(model);
    });
  };

  remove = () => {
    this.props.onRemove();
  };

  render() {
    const { item, choicesList, isLoading } = this.props;

    return (
      <BaseForm
        onValidSubmit={this.submit}
        onValid={this.onValid}
        onInvalid={this.onInvalid}
        onChange={this.onChange}
        lang="en-150"
      >
        <Prompt
          when={this.state.notSaved}
          message="Modification non sauvegardé, continuer sans sauvegarder ?"
        />
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
              name="status"
              label="Actif sur le site"
              defaultToggled={item.available}
              labelPosition="right"
              disabled={isLoading}
              style={{ marginTop: 14 }}
            />
            <ToggleInput
              name="on_selection"
              label="Dans la sélection du moment"
              defaultToggled={item.on_selection && item.on_selection !== '0'}
              labelPosition="right"
              disabled={isLoading}
              style={{ marginTop: 14 }}
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
              floatingLabelText="Code article commercant"
              hintText="Exemple : REF0054"
              initialValue={item.ref}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="notes_com"
              floatingLabelText="Commentaire"
              initialValue={item.notes_com}
              fullWidth
              disabled={isLoading}
            />
            <NumberInput
              name="prix_public"
              floatingLabelText="Prix"
              hintText="Prix en Euro"
              initialValue={item.prix_public}
              fullWidth
              step="0.05"
              required
              disabled={isLoading}
            />
            <SelectInput
              name="unite_prix"
              floatingLabelText="Unité de prix"
              value={item.unite_prix}
              fullWidth
              disabled={isLoading}
            >
              <MenuItem value="kg" primaryText="Kg" />
              <MenuItem value="pièce" primaryText="Pièce" />
            </SelectInput>
            <TextInput
              name="short_description"
              floatingLabelText="Description"
              initialValue={item.short_description}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="poids_portion"
              floatingLabelText="Poids portion (g)"
              hintText="Poids en gramme"
              initialValue={item.poids_portion}
              fullWidth
              type="number"
              step="0.01"
              disabled={isLoading}
            />
            <TextInput
              name="nbre_portion"
              floatingLabelText="Nombre portion"
              initialValue={item.nbre_portion}
              fullWidth
              disabled={isLoading}
            />
            <SelectInput
              name="tax_class_id"
              floatingLabelText="TVA"
              hintText="TVA applicable"
              value={item.tax_class_id}
              fullWidth
              disabled={isLoading}
            >
              <MenuItem value="5" primaryText="5.5%" />
              <MenuItem value="9" primaryText="10%" />
              <MenuItem value="10" primaryText="20%" />
            </SelectInput>
            <TextInput
              name="origine"
              floatingLabelText="Origine"
              initialValue={item.origine}
              fullWidth
              disabled={isLoading}
            />
            <SelectInput
              name="produit_biologique"
              floatingLabelText="Bio"
              hintText="Produit biologique ?"
              value={item.produit_biologique}
              fullWidth
              disabled={isLoading}
            >
              <MenuItem value={false} primaryText="Non" />
              <MenuItem value={true} primaryText="Oui" />
            </SelectInput>
            {this.context.role === 'ROLE_ADMIN' &&
              <SelectInput
                name="shop"
                floatingLabelText="Magasin"
                value={item.commercant}
                fullWidth
                required
                disabled={isLoading}
              >
                {choicesList.shops.map(
                  u => <MenuItem key={u.value} value={u.value} primaryText={u.name} />
                )}
              </SelectInput>
            }
          </Col>
          <Col xs={12}>
            {item.entity_id ?
              <div style={{ position: 'relative' }}>
                {item.photo &&
                  <img
                    src={`${globalConfig.baseUrl}/uploads/products/${item.id}/${item.photo}`}
                    alt="" accept="image/*" capture
                  />}
                <RaisedButton
                  containerElement="label"
                  label="Photo"
                >
                  <FileInput
                    name="photo"
                    style={{
                      opacity: 0, position: 'absolute', top: 0, bottom: 0, right: 0, width: '100%'
                    }}
                    setValue={this.upload}
                  />
                </RaisedButton>
              </div>
              : ''
            }
          </Col>
          {item.entity_id && <Col xs={12}>
            <RaisedButton
              onMouseUp={this.remove}
              containerElement="label"
              label="Supprimer"
              fullWidth
              backgroundColor="#dc8585"
            />
          </Col>}
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
  choicesList: PropTypes.object,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  onUpload: PropTypes.func,
  onRemove: PropTypes.func,
};

export default Form;
