import React from 'react';
import { Switch, Route } from 'react-router';

import App from './containers/App';
import Dashboard from './containers/DashboardPage';
import { App as Order, Header as OrderHeader } from './containers/Order';
import { App as Product, Header as ProductHeader } from './containers/Product';
import { App as User, Header as UserHeader } from './containers/User';

export default (
  <App
    header={
      <Switch>
        <Route path="/orders" component={OrderHeader} />
        <Route path="/products" component={ProductHeader} />
        <Route path="/users" component={UserHeader} />
      </Switch>
    }
  >
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/orders" component={Order} />
      <Route path="/products" component={Product} />
      <Route path="/users" component={User} />
    </Switch>
  </App>
);
