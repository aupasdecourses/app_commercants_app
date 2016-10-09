import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import DashboardPage from './containers/DashboardPage';
import ProductsPage from './containers/ProductsPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DashboardPage} />
    <Route path="/dashboard" component={DashboardPage} />
    <Route path="/products" component={ProductsPage} />
  </Route>
);
