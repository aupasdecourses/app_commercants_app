import {
  PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAIL,
  PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL,
} from '../constants/ActionTypes';

const initialState = {
  item: {},
  isFetching: false,
  hasFetched: false,
  hasError: false,
};

export default function product(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return {
        ...state,
        hasFetched: false,
        isFetching: true,
      };
    case PRODUCT_SAVE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PRODUCT_SUCCESS:
    case PRODUCT_SAVE_SUCCESS:
      return {
        ...state,
        item: action.payload.data,
        isFetching: false,
        hasFetched: true,
        hasError: false,
      };
    case PRODUCT_FAIL:
    case PRODUCT_SAVE_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    default:
      return state;
  }
}
