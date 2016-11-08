import { LOGIN_REQUEST, LOGOUT, RESETTING_REQUEST } from '../constants/ActionTypes';

import globalConfig from '../config';

function loginOAuth(credential, type) {
  const data = {
    ...credential,
    grant_type: type,
    client_id: globalConfig.auth.clientId,
    client_secret: globalConfig.auth.clientSecret,
  };

  return {
    type: LOGIN_REQUEST,
    payload: {
      request: {
        url: '/oauth/v2/token',
        method: 'POST',
        data
      }
    }
  };
}

function loginJwt(credential) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      request: {
        url: '/login',
        method: 'POST',
        data: credential
      }
    }
  };
}

export function login(credential, type = 'password') {
  if (globalConfig.auth.type === 'oauth') {
    return loginOAuth(credential, type);
  }

  return loginJwt(credential);
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function resetting(username) {
  return {
    type: RESETTING_REQUEST,
    payload: {
      request: {
        url: '/resetting/send-email',
        username,
      }
    }
  };
}