import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formsy-react';

import { RaisedButton } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';

import TextInput from '../Form/TextInput';

const Filters = ({ onSubmit }) => (
  <Form
    style={{ padding: '0 24px' }}
    onSubmit={(model) => onSubmit(model)}
  >
    <TextInput
      name="search"
      floatingLabelText="Recherche"
      hintText="Recherche sur le nom, ref et sku"
    />
    <RaisedButton
      type="submit"
      icon={<SearchIcon />}
      secondary
    />
  </Form>
);

Filters.propTypes = {
  onSubmit: PropTypes.func,
};

export default Filters;
