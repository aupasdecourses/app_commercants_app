import moment from 'moment';

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

export function fetchUsers(filters, short = false) {
  if (short) {
    filters = {
      ...filters,
      _only: ['id', 'username'],
      length: 0,
    };
  }

  filters = {
    ...filters,
    type: 1, // Note: Force customer user
  };

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

export function fetchUsersIfNeeded(filters, short = false) {
  return (dispatch, getState) => {
    const { users } = getState();

    if (!users.fetchedDate) {
      return dispatch(fetchUsers(filters, short));
    }

    const today = moment();
    const diff = today.diff(moment(users.fetchedDate), 'minutes');

    if (diff >= 0) {
      return dispatch(fetchUsers(filters, short));
    }

    return null;
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
