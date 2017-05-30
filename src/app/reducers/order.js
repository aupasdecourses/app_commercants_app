import {
  ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAIL,
} from '../constants/ActionTypes';

const initialState = {
  item: {},
  isFetching: false,
  hasFetched: false,
  hasError: false,
};

export default function order(state = initialState, action) {
  switch (action.type) {
    case ORDER_REQUEST:
      return {
        ...state,
        hasFetched: false,
        isFetching: true,
      };
    case ORDER_SUCCESS:
      return {
        ...state,
        item: action.payload.data,
        isFetching: false,
        hasFetched: true,
        hasError: false,
      };
    case ORDER_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    default:
      return state;
  }
}
