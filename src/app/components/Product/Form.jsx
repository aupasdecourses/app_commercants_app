import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

import './Form.css';

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

  submit = (model) => {
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
              defaultToggled={item.status && item.status === '1'}
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
            {this.context.role === 'ROLE_ADMIN' &&
              <TextInput
                name="sku"
                floatingLabelText="SKU"
                hintText="Poids en gramme"
                disabled={isLoading}
              />
            }
            <TextInput
              name="name"
              floatingLabelText="Nom de l’article (obligatoire)"
              hintText="Nom affiché sur le site, exemple : Pizza 4 fromages"
              initialValue={item.name}
              fullWidth
              required
              disabled={isLoading}
            />
            <TextInput
              name="reference_interne_magasin"
              floatingLabelText="Code article / Code balance (PLU)"
              hintText="Exemple : 184, 85"
              initialValue={item.reference_interne_magasin}
              fullWidth
              disabled={isLoading}
            />
            <SelectInput
              name="unite_prix"
              floatingLabelText="Unité prix (obligatoire)"
              value={item.unite_prix}
              fullWidth
              required
              disabled={isLoading}
            >
              <MenuItem value="kg" primaryText="Kg" />
              <MenuItem value="pièce" primaryText="Pièce" />
            </SelectInput>
            <NumberInput
              name="prix_public"
              floatingLabelText="Prix au kg ou à la pièce(obligatoire)"
              hintText="1.20 ,2.00, ..."
              initialValue={item.prix_public}
              fullWidth
              required
              validations={{
                matchRegexp: /^-?\d+(?:[.,]\d*?)?$/
              }}
              validationErrors={{
                matchRegexp: 'Nombre non valide'
              }}
              disabled={isLoading}
            />
            <TextInput
              name="short_description"
              floatingLabelText="Description produit (obligatoire)"
              hintText="La pièce de 300g, La barquette de 250g, Les 3 kiwis de 100g chacun"
              initialValue={item.short_description}
              fullWidth
              disabled={isLoading}
            />
            <TextInput
              name="poids_portion"
              floatingLabelText="Poids portion en kg (obligatoire)"
              hintText="0.120, 1.250, ..."
              initialValue={item.poids_portion}
              fullWidth
              type="number"
              step="0.01"
              required
              disabled={isLoading}
            />
            <TextInput
              name="nbre_portion"
              floatingLabelText="Nombre portion (obligatoire)"
              initialValue={item.nbre_portion}
              hintText="1, 2, 10, ..."
              fullWidth
              required
              disabled={isLoading}
            />
            <SelectInput
              name="tax_class_id"
              floatingLabelText="TVA (obligatoire)"
              hintText="TVA applicable"
              value={item.tax_class_id}
              fullWidth
              required
              disabled={isLoading}
            >
              <MenuItem value="5" primaryText="5.5%" />
              <MenuItem value="9" primaryText="10%" />
              <MenuItem value="10" primaryText="20%" />
            </SelectInput>
            <SelectInput
              name="origine"
              floatingLabelText="Origine"
              value={item.origine}
              fullWidth
              disabled={isLoading}
            >
              {Object.keys(choicesList.origines).map(
                k => <MenuItem key={k} value={k} primaryText={choicesList.origines[k]} />
              )}
            </SelectInput>
            <SelectInput
              name="produit_biologique"
              floatingLabelText="Produit Bio ?"
              hintText="Produit biologique ?"
              value={item.produit_biologique}
              fullWidth
              disabled={isLoading}
            >
              <MenuItem value="76" primaryText="Non" />
              <MenuItem value="276" primaryText="Oui" />
              <MenuItem value="34" primaryText="AB" />
            </SelectInput>
            <TextInput
              floatingLabelText="Commentaires sur le produit"
              name="notes_com"
              hintText="Produit uniquement disponible en hiver, A recommander avec du vin rouge,  ..."
              initialValue={item.notes_com}
              fullWidth
              disabled={isLoading}
            />
            {this.context.role === 'ROLE_ADMIN' &&
              <SelectInput
                name="commercant"
                floatingLabelText="Magasin (obligatoire)"
                value={item.commercant && parseInt(item.commercant, 10)}
                fullWidth
                required
                disabled={isLoading}
              >
                {choicesList.shops.map(
                  u => <MenuItem key={u.value} value={u.merchant} primaryText={u.name} />
                )}
              </SelectInput>
            }
          </Col>
          <Col xs={12}>
            <h2>Images</h2>
            {item.entity_id ?
                <div style={{ position: 'relative' }}>
                    <Row>
                      <Col sm={6} >
                        <h3>Image actuellement sur le site</h3>
                        <div style={{ position: 'relative' }}>
                        {item.small_image &&
                          <img
                            src={`${globalConfig.baseUrl}/../../../media/catalog/product/${item.small_image}`}
                            alt=""
                            className={'image-site'}
                          />}
                        </div>
                      </Col>
                      <Col sm={6} >
                        <div style={{ position: 'relative' }}>
                          <h3>Image uploadée par vos soins</h3>
                          {item.image_tmp &&
                          <img
                            src={`${globalConfig.baseUrl}/../${item.image_tmp}`}
                            alt="" accept="image/*" capture
                            className={'image-site'}
                            style={{width: '100%'}}
                          />}
                        </div>
                        <RaisedButton
                          containerElement="label"
                          label="Proposer une nouvelle photo"
                          primary={true}
                        >
                          <FileInput
                            name="photo"
                            style={{
                              opacity: 0, position: 'absolute', top: 0, bottom: 0, right: 0, width: '100%'
                            }}
                            setValue={this.upload}
                          />
                        </RaisedButton>
                      </Col>
                    </Row>
                </div>
              : '' }
          </Col>
          {item.entity_id && <Col xs={12}>
            <h2>Suppression du produit</h2>
            <RaisedButton
              onMouseUp={this.remove}
              containerElement="label"
              label="Demander la suppression du produit"
              backgroundColor="#ff0000"
              labelColor="#fff"
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
