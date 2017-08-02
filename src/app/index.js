import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FastClick from 'fastclick';
FastClick.attach(document.body);

import Root from 'app/containers/Root';
import { configureStore, history } from '../app/store/configureStore';

injectTapEventPlugin();

configureStore(store => {
  // Update the online status icon based on connectivity
  window.addEventListener('online', () => {
    store.dispatch({
      type: 'NOTIFICATION_OPEN',
      data: {
        type: 'success',
        message: 'La connexion à Internet est revenue',
      }
    });
  });

  window.addEventListener('offline', () => {
    store.dispatch({
      type: 'NOTIFICATION_OPEN',
      data: {
        type: 'warning',
        message: 'La connexion à Internet a échoué',
      }
    });
  });

  render(
    <Root store={store} history={history} />,
    document.getElementById('root')
  );
});
