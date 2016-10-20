import {
  USER_REQUEST, USER_SUCCESS, USER_FAIL,
  USER_SAVE_REQUEST, USER_SAVE_SUCCESS, USER_SAVE_FAIL,
} from '../constants/ActionTypes';

const initialState = {
  item: {},
  isFetching: false,
  hasFetched: false,
  hasError: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        hasFetched: false,
        isFetching: true,
      };
    case USER_SAVE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case USER_SUCCESS:
    case USER_SAVE_SUCCESS:
      return {
        ...state,
        item: action.payload.data,
        isFetching: false,
        hasFetched: true,
        hasError: false,
      };
    case USER_FAIL:
    case USER_SAVE_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    default:
      return state;
  }
}
