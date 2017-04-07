import React, { PropTypes } from 'react';
import { Form } from 'formsy-react';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextInput from '../Form/TextInput';
import FlatButton from 'material-ui/FlatButton';

const Search = ({ onSubmit }) => (
  <Form
    style={{ padding: '4px 0' }}
    onSubmit={(model) => onSubmit(model)}
  >
    <TextInput
      name="search"
      hintText="Keyword"
    />
    <FlatButton
      type="submit"
      icon={<SearchIcon />}
      secondary
    />
  </Form>
);

Search.propTypes = {
  onSubmit: PropTypes.func,
};

export default Search;
