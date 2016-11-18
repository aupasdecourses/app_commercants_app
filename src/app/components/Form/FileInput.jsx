import React, { Component } from 'react';
import { HOC } from 'formsy-react';

class FileInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileList: []
    };

    this.changeValue = this.changeValue.bind(this);
  }

  // changeValue(event) {
  //   const target = event.currentTarget;
  //   const value = target.value;
  //   this.setState({ fileList: target.files });
  //   this.setValue(target.files);
  // }

  changeValue(event) {
    const newValue = event.currentTarget.files[0];

    if (this.state.value !== newValue) {
      this.setState({ value: newValue }, () => {
        if (!this.state.focused) {
          this.props.setValue(this.state.value);
        }
      });
    }
  }

  render() {
    const {
      onChange,
      hasValue, getValue, setValue, resetValue,
      isValid, isValidValue, isPristine, isRequired,
      validations, setValidations, validationError, validationErrors,
      getErrorMessage, getErrorMessages, showError, showRequired,
      isFormDisabled, isFormSubmitted,
      initialValue,
      ...otherProps } = this.props;

    return (
      <input
        {...otherProps}
        type="file"
        onChange={this.changeValue}
      />
    );
  }
}

export default HOC(FileInput);
