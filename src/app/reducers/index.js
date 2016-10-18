import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

// import auth from './auth';   // Jwt
import auth from './oauth';     // OAtuh
import products from './products';
import profile from './profile';
import extension from './extension';

export default (
  typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id ?
    combineReducers({ auth, products, profile, routing, extension }) :
    combineReducers({ auth, products, profile, routing })
);
