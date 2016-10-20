import {
  USERS_REQUEST, USER_REQUEST, USER_SAVE_REQUEST,
} from '../constants/ActionTypes';

export function fetchUser(id) {
  return {
    type: USER_REQUEST,
    payload: {
      request: {
        url: `/users/${id}`,
        method: 'GET',
      },
    },
  };
}

export function fetchUsers(filters) {
  return {
    type: USERS_REQUEST,
    payload: {
      request: {
        url: '/users',
        method: 'GET',
        params: filters,
      },
    },
  };
}

export function saveUser(id, data) {
  const method = id ? 'PUT' : 'POST';

  return {
    type: USER_SAVE_REQUEST,
    payload: {
      request: {
        url: `/users${id ? `/${id}` : ''}`,
        method,
        data,
      },
    },
  };
}
