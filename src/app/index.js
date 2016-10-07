import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FastClick from 'fastclick';
FastClick.attach(document.body);

import Root from 'app/containers/Root';
import configureStore from '../app/store/configureStore';

injectTapEventPlugin();

configureStore(store => {
  const history = syncHistoryWithStore(hashHistory, store);

  render(
    <Root store={store} history={history} />,
    document.getElementById('root')
  );
});
