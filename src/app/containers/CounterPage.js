import { connect } from 'react-redux';

import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

const mapDispatchToProps = CounterActions;

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
