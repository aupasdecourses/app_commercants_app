import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// import auth from './auth';   // Jwt
import auth from './oauth';     // OAtuh
import ui from './ui';
import product from './product';
import products from './products';
import profile from './profile';
import user from './user';
import users from './users';
import extension from './extension';

export default (
  typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id ?
    combineReducers({ auth, ui, product, products, profile, user, users, routing, extension }) :
    combineReducers({ auth, ui, product, products, profile, user, users, routing })
);
