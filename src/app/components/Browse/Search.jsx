import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import { Form } from 'formsy-react';

import SearchIcon from 'material-ui/svg-icons/action/search';
import FlatButton from 'material-ui/FlatButton';

import TextInput from '../Form/TextInput';

const Search = ({ onSubmit }) => (
  <Form
    style={{ padding: '4px 0' }}
    onSubmit={(model) => onSubmit(model)}
  >
    <Media query="(min-width: 599px)">
      {matches => matches ? (
          <TextInput
            name="search"
            hintText="Keyword"
          />
        ) : (
          <TextInput
            name="search"
            hintText="Keyword"
            style={{ width: '100%' }}
          />
        )}
    </Media>
    <Media query="(min-width: 599px)" render={() => (
      <FlatButton
        type="submit"
        icon={<SearchIcon />}
        secondary
      />)}
    />
  </Form>
);

Search.propTypes = {
  onSubmit: PropTypes.func,
};

export default Search;
