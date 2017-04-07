import {
  PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAIL,
  PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL,
  USERS_REQUEST, USERS_SUCCESS, USERS_FAIL,
  NOTIFICATION_OPEN, NOTIFICATION_CLOSE,
} from '../constants/ActionTypes';

const initialState = {
  fetching: false,
  notification: {},
  pinned: 0,
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_REQUEST:
    case PRODUCT_SAVE_REQUEST:
    case USERS_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case PRODUCTS_SUCCESS:
    case PRODUCTS_FAIL:
    case PRODUCT_SAVE_SUCCESS:
    case PRODUCT_SAVE_FAIL:
    case USERS_SUCCESS:
    case USERS_FAIL:
      return {
        ...state,
        fetching: false,
      };
    case NOTIFICATION_OPEN:
      return {
        ...state,
        notification: {
          type: action.data.type,
          message: action.data.message,
        },
      };
    case NOTIFICATION_CLOSE:
      return {
        ...state,
        notification: {},
      };
    default:
      return state;
  }
}
