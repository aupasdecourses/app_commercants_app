import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Dashboard from './containers/DashboardPage';
import CreateUser from './containers/CreateUserPage';
import Profile from './containers/ProfilePage';
import Products from './containers/Product/ListPage';
import ProductCreate from './containers/Product/CreatePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="products">
      <IndexRoute component={Products} />
      <Route path="new" component={ProductCreate} />
      <Route path=":id/edit" component={ProductCreate} />
    </Route>
    <Route path="users/new" component={CreateUser} />
    <Route path="profile" component={Profile} />
  </Route>
);
