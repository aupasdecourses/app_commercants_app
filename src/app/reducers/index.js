import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// import auth from './auth';   // Jwt
import auth from './oauth';     // OAtuh
import ui from './ui';
import order from './order';
import orders from './orders';
import product from './product';
import products from './products';
import profile from './profile';
import user from './user';
import users from './users';

export default (
  combineReducers({ auth, ui, order, orders, product, products, profile, user, users, routing })
);
