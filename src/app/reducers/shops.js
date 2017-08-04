import {
  SHOPS_REQUEST, SHOPS_SUCCESS, SHOPS_FAIL,
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

export default function shops(state = initialState, action) {
  switch (action.type) {
    case SHOPS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SHOPS_SUCCESS:
      return {
        ...state,
        items: action.payload.data.data,
        short: action.payload.data.data.reduce((o, item) => {
          const short = {
            value: item.merchant,
            name: item.name,
          };

          o.push(short);

          return o;
        }, []),
        total: action.payload.data.recordsFiltered,
        isFetching: false,
        hasFetched: true,
        hasError: false,
      };
    case SHOPS_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    default:
      return state;
  }
}
