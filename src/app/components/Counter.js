import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Flex, Box } from 'reflexbox';

const Counter = ({ increment, incrementIfOdd, incrementAsync, decrement, counter }) => (
  <Flex align="center" column>
    <Box p={1}>
      Clicked: <span className="counter">{counter.count}</span> times
    </Box>
    <Box p={1}>
      <RaisedButton label="+" onTouchTap={increment} />
      {' '}
      <RaisedButton label="-" onTouchTap={decrement} />
    </Box>
    <Box p={1}>
      <RaisedButton label="Increment if odd" onTouchTap={incrementIfOdd} />
    </Box>
    <Box p={1}>
      <RaisedButton label="Increment async" onTouchTap={incrementAsync} />
    </Box>
  </Flex>
);

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.object.isRequired
};

export default Counter;
