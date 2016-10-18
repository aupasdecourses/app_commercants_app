import React from 'react';

const Select = (props) => {
  const {
    options, className, isLoading, defaultOption, disabled, ...otherProps,
  } = props;

  return (
    <select
      className={`${className}${isLoading ? ' spinner' : ''}`}
      disabled={isLoading || disabled}
      {...otherProps}
    >
      {defaultOption ?
        <option value="">{defaultOption}</option> : ''
      }
      {options ? options.map((option) => (
        <option key={option.value} value={option.value}>{option.name}</option>
      )) : ''
      }
    </select>
  );
};

Select.defaultProps = {
  className: 'form-control',
};

Select.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.object),
  defaultOption: React.PropTypes.string,
  className: React.PropTypes.string,
  isLoading: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
};

export default Select;
