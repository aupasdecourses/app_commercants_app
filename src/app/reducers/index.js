import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import auth from './auth';
import profile from './profile';
import counter from './counter';
import extension from './extension';

export default (
  typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id ?
    combineReducers({ auth, profile, counter, routing, extension }) :
    combineReducers({ auth, profile, counter, routing })
);
