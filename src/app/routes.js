import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Dashboard from './containers/DashboardPage';
import Orders from './containers/Order/ListPage';
import OrderShow from './containers/Order/ShowPage';
import Profile from './containers/ProfilePage';
import Products from './containers/Product/ListPage';
import ProductCreate from './containers/Product/CreatePage';
import ProductEdit from './containers/Product/EditPage';
import Users from './containers/User/ListPage';
import UserCreate from './containers/User/CreatePage';
import UserEdit from './containers/User/EditPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="orders">
      <IndexRoute component={Orders} />
      <Route path=":id/edit" component={OrderShow} />
    </Route>
    <Route path="products">
      <IndexRoute component={Products} />
      <Route path="new" component={ProductCreate} />
      <Route path=":id/edit" component={ProductEdit} />
    </Route>
    <Route path="users">
      <IndexRoute component={Users} />
      <Route path="new" component={UserCreate} />
      <Route path=":id/edit" component={UserEdit} />
    </Route>
    <Route path="profile" component={Profile} />
  </Route>
);
