import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HOC } from 'formsy-react';

import { TextField } from 'material-ui';

class NumberInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue || '',
      focused: false,
    };
  }

  componentDidMount() {
    if (this.props.initialValue) {
      this.props.setValue(this.state.value);
    }
  }

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.setState({ focused: false });
      this.props.setValue(this.state.value);
    }
  };

  onFocus= () => {
    this.setState({ focused: true });
  };

  onBlur = () => {
    this.setState({ focused: false });
    this.props.setValue(this.state.value);
  };

  showErrors = () => {
    return !this.props.isPristine() && this.props.showRequired() ?
      'Required' :
      this.props.getErrorMessage();
  };

  changeValue = (event) => {
    const newValue = event.currentTarget.value;

    if (this.state.value !== newValue && this.isFloat(newValue)) {
      this.setState({ value: newValue }, () => {
        if (!this.state.focused) {
          this.props.setValue(this.state.value);
        }
      });
    }
  };

  isFloat(val) {
    const floatRegex = /^-?\d*[.,]?\d*$/;

    return floatRegex.test(val);
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

// Note: Add this to the field
NumberInput.defaultProps = {
  validations: {
    matchRegexp: /^-?\d+(?:[.,]\d*?)?$/
  },
  validationErrors: {
    matchRegexp: 'Non valid number'
  }
};

NumberInput.propTypes = {
  initialValue: PropTypes.string,
};

export default HOC(NumberInput);
