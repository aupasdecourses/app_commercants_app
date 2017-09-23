import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import RaisedButton from 'material-ui/RaisedButton';

class Publish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notValid: true,
      value: props.children,
    };
  }

  submit() {
    const model = {};

    model[this.props.name] = this.state.value === '1' ? '0' : '1';

    this.props.onSubmit(model).then(() => {
      this.setState({ value: model[this.props.name] });
    });
  }

  render() {
    const value = this.state.value;

    return (
      <RaisedButton
        onTouchTap={(e) => this.submit()}
        style={{ minWidth: 48 }}
        icon={!value || value === '1' ? <CheckCircleIcon /> : <CancelIcon />}
        backgroundColor={!value || value === '1' ? '#b9d466' : '#dc8585'}
      />
    );
  }
}

Publish.propTypes = {
  children: PropTypes.any,
  onSubmit: PropTypes.func,
  name: PropTypes.string,
};

export default Publish;
