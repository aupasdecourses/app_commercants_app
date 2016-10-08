import { LOGIN_REQUEST, LOGOUT } from '../constants/ActionTypes';

export function login(credential) {
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

export function logout() {
  localStorage.removeItem('token');
  return {
    type: LOGOUT
  };
}
