import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

if (!window.Intl) {
  require('intl');
}

import { IntlProvider } from 'react-intl';

import ThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const customTheme = {
  palette: {
    primary1Color: '#26a546',
    accent1Color: '#393d3b'
  }
};

import routes from '../routes';
import locales from '../i18n/locales';

let locale = navigator.language.substr(0, 2) || 'en';

if (locales.indexOf(locale) === -1) {
  locale = 'en';
}

const messages = require(`../i18n/${locale}.i18n`);

const Root = ({ history, store }) => (
  <ThemeProvider muiTheme={getMuiTheme(customTheme)}>
    <Provider store={store}>
      <IntlProvider
        locale={locale}
        messages={messages}
      >
        <Router history={history} routes={routes} />
      </IntlProvider>
    </Provider>
  </ThemeProvider>
);

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Root;
