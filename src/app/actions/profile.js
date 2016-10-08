import { PROFILE_REQUEST } from '../constants/ActionTypes';

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
