import {
  ORDERS_REQUEST, ORDERS_SUCCESS, ORDERS_FAIL,
  ORDERS_FILTER_COLUMN,
} from '../constants/ActionTypes';

const initialState = {
  items: [],
  short: [],
  total: 0,
  columns: {
    increment_id: true,
    ddate: true,
    subtotal_incl_tax: true,
  },
  isFetching: false,
  hasFetched: false,
  fetchedDate: null,
  hasError: false,
};

export default function orders(state = initialState, action) {
  switch (action.type) {
    case ORDERS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ORDERS_SUCCESS:
      return {
        ...state,
        items: action.payload.data.data,
        short: action.payload.data.data.reduce((o, item) => {
          const short = {
            value: item.id,
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
    case ORDERS_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    case ORDERS_FILTER_COLUMN:
      return {
        ...state,
        columns: Object.assign({}, state.columns, action.column)
      };
    default:
      return state;
  }
}
