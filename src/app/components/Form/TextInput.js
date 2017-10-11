import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HOC } from 'formsy-react';

import { TextField } from 'material-ui';

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue || '',
      focused: false,
    };

    this.changeValue = this.changeValue.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.showErrors = this.showErrors.bind(this);
  }

  componentDidMount() {
    if (this.props.initialValue) {
      this.props.setValue(this.state.value);
    }
  }

  changeValue(event) {
    const newValue = event.currentTarget.value;

    if (this.state.value !== newValue) {
      this.setState({ value: newValue }, () => {
        if (!this.state.focused) {
          this.props.setValue(this.state.value);
        }
      });
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.setState({ focused: false });
      this.props.setValue(this.state.value);
    }
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur() {
    this.setState({ focused: false });
    this.props.setValue(this.state.value);
  }

  showErrors() {
    return !this.props.isPristine() && this.props.showRequired() ?
      'Champs requis' :
      this.props.getErrorMessage();
  }

  render() {
    const {
      required,
      onChange, onFocus, onBlur,
      hasValue, getValue, setValue, resetValue,
      isValid, isValidValue, isPristine, isRequired,
      validations, setValidations, validationError, validationErrors,
      getErrorMessage, getErrorMessages, showError, showRequired,
      isFormDisabled, isFormSubmitted,
      initialValue,
      ...otherProps } = this.props;

    return (
      <TextField
        {...otherProps}
        errorText={this.showErrors()}
        onChange={this.changeValue}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        value={this.state.value}
      />
    );
  }
}

TextInput.propTypes = {
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HOC(TextInput);
