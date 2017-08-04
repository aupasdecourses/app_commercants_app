import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import qhistory from 'qhistory';
import { stringify, parse } from 'query-string';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';
import apiMiddleware from '../api/Api';

const history = qhistory(
  createHashHistory(),
  stringify,
  parse
);

const configureStore = (callback, isBg) => {
  let getState;

  if (isBg === undefined) {
    getState = require('./getStoredState');
  } else {
    getState = (isBg ? require('./getStateToBg') : require('./getStateFromBg'));
  }

  getState(initialState => {
    let enhancer;

    const middleware = [
      apiMiddleware,
      thunk,
      routerMiddleware(history)
    ];

    if (process.env.NODE_ENV !== 'production') {
      middleware.push(
        require('redux-immutable-state-invariant')(),
        require('redux-logger')({ level: 'info', collapsed: true })
      );
      enhancer = compose(
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      );
    } else {
      enhancer = applyMiddleware(...middleware);
    }

    const store = createStore(rootReducer, initialState, enhancer);

    if (process.env.NODE_ENV !== 'production') {
      if (module.hot) {
        module.hot.accept('../reducers', () =>
          store.replaceReducer(require('../reducers'))
        );
      }
    }

    return store;
  }, callback);
};

export default { configureStore, history };
