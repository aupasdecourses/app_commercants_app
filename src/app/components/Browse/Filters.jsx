import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formsy-react';

import SearchIcon from 'material-ui/svg-icons/action/search';
import RaisedButton from 'material-ui/RaisedButton';
import SelectInput from 'formsy-material-ui/lib/FormsySelect';
import TextInput from 'formsy-material-ui/lib/FormsyText';
import { MenuItem } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid/lib';

const Filters = ({ definition, onSubmit }, context) => {
  function renderFilter(field, name) {
    const type = field.type;

    if (type === 'publish') {
      return (<SelectInput
        key={name}
        name={name}
        floatingLabelText={field.alias}
        floatingLabelFixed
      >
        <MenuItem primaryText="" />
        <MenuItem value="0" primaryText="Non" />
        <MenuItem value="1" primaryText="Oui" />
      </SelectInput>);
    }

    return (<TextInput
      key={name} name={name}
      floatingLabelText={field.alias}
      floatingLabelFixed
    />);
  }

  return (
    <Form
      style={{ padding: '0 10px', background: context.muiTheme.palette.accent2Color }}
      onSubmit={(model) => onSubmit(model)}
    >
      <Row middle="xs">
        <Col xs={12} sm={1} style={{ textAlign: 'right' }}>
          <RaisedButton
            style={{ minWidth: 36 }}
            type="submit"
            icon={<SearchIcon />}
            secondary
          />
        </Col>
        <Col xs={12} sm={11}>
          {Object.keys(definition).map((key) => (
            renderFilter(definition[key], key)
          )) }
        </Col>
      </Row>
    </Form>
  );
};

Filters.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

Filters.propTypes = {
  definition: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default Filters;
