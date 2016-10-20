import { PROFILE_REQUEST, PROFILE_SAVE_REQUEST } from '../constants/ActionTypes';

export function fetchProfile() {
  return {
    type: PROFILE_REQUEST,
    payload: {
      request: {
        url: '/profile',
        method: 'GET'
      }
    }
  };
}

export function saveProfile(data) {
  return {
    type: PROFILE_SAVE_REQUEST,
    payload: {
      request: {
        url: '/profile',
        method: 'PUT',
        data,
      },
    },
  };
}
