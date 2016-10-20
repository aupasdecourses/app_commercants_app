import {
  USERS_REQUEST, USERS_SUCCESS, USERS_FAIL,
} from '../constants/ActionTypes';

const initialState = {
  items: [],
  short: [],
  total: 0,
  isFetching: false,
  hasFetched: false,
  fetchedDate: null,
  hasError: false,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case USERS_SUCCESS:
      return {
        ...state,
        items: action.payload.data.data,
        short: action.payload.data.data.reduce((o, item) => {
          const short = {
            value: item.id,
            name: item.shopName,
          };

          o.push(short);

          return o;
        }, []),
        total: action.payload.data.recordsTotal,
        isFetching: false,
        hasFetched: true,
        hasError: false,
      };
    case USERS_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    default:
      return state;
  }
}
