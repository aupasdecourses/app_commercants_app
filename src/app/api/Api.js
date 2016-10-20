import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { onError } from 'redux-axios-middleware/lib/defaults';

import globalConfig from '../config';
import { logout } from '../actions/auth';

const apiClient = axios.create({
  baseURL: globalConfig.baseUrl,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 10000
});

const apiMiddleware = axiosMiddleware(apiClient, {
  interceptors: {
    request: [
      ({ getState }, config) => {
        if (getState().auth.token) {
          config.headers.Authorization = 'Bearer ' + getState().auth.token;
        }

        return config;
      }
    ]
  },
  onError: (props, options) => {
    if (props.error.response && props.error.response.status === 401) {
      return props.dispatch(logout());
    }

    return onError(props, options);
  }
});

export default apiMiddleware;
