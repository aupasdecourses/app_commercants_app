import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

if (!window.Intl) {
  require('intl');
}

import { addLocaleData, IntlProvider } from 'react-intl';

import ThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const customTheme = {
  palette: {
    primary1Color: '#26a546',
    accent1Color: '#393d3b'
  }
};

import Routes from '../routes';
import locales from '../i18n/locales';

let locale = navigator.language.substr(0, 2) || 'fr';

if (locales.indexOf(locale) === -1) {
  locale = 'fr';
}

const lang = require(`react-intl/locale-data/${locale}`);
const messages = require(`../i18n/${locale}.i18n`);

addLocaleData([...lang]);

const Root = ({ history, store }) => (
  <ThemeProvider muiTheme={getMuiTheme(customTheme)}>
    <Provider store={store}>
      <IntlProvider
        locale={locale}
        messages={messages}
      >
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>
  </ThemeProvider>
);

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Root;
