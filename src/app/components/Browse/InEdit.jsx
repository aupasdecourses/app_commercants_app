import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formsy-react';
import SaveIcon from 'material-ui/svg-icons/content/save';
import RaisedButton from 'material-ui/RaisedButton';

import TextInput from '../Form/TextInput';

class InEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      notValid: true,
      value: props.children,
    };
  }

  submit(model) {
    this.props.onSubmit(model).then(() => {
      this.setState({ showForm: false, value: model[this.props.name] });
    });
  }

  render() {
    return (
      <div onMouseUp={() => this.setState({ showForm: true })}>
        {this.state.showForm ?
          <Form
            onValidSubmit={(model) => this.submit(model)}
            onValid={() => this.setState({ notValid: true })}
            onInvalid={() => this.setState({ notValid: false })}
          >
            <RaisedButton
              style={{ minWidth: 48, marginRight: 5 }}
              disabled={!this.state.notValid}
              type="submit"
            >
              <SaveIcon />
            </RaisedButton>
            <TextInput
              name={this.props.name}
              floatingLabelText="Nouvelle valeur"
              initialValue={this.state.value}
              fullWidth
            />
          </Form> :
          <div>{ this.state.value || '-' }</div>
        }
      </div>
    );
  }
}

InEdit.propTypes = {
  children: PropTypes.any,
  onSubmit: PropTypes.func,
  name: PropTypes.string,
};

export default InEdit;
