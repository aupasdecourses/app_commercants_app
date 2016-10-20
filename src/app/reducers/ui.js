import {
  PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAIL,
  USERS_REQUEST, USERS_SUCCESS, USERS_FAIL,
} from '../constants/ActionTypes';

const initialState = {
  fetching: false,
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_REQUEST:
    case USERS_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case PRODUCTS_SUCCESS:
    case PRODUCTS_FAIL:
    case USERS_SUCCESS:
    case USERS_FAIL:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
}
