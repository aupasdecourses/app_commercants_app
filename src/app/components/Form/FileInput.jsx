import React, { Component } from 'react';
import { HOC } from 'formsy-react';

class FileInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileList: []
    };
  }

  // changeValue(event) {
  //   const target = event.currentTarget;
  //   const value = target.value;
  //   this.setState({ fileList: target.files });
  //   this.setValue(target.files);
  // }

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

  render() {
    const { ...otherProps } = this.props;

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
