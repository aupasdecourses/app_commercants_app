import {
  PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAIL,
  PRODUCTS_FILTER_COLUMN,
} from '../constants/ActionTypes';

const initialState = {
  items: [],
  short: [],
  total: 0,
  columns: {
    status: true,
    name: true,
    unite_prix: true,
    price: true,
    nbre_portion: false,
    short_description: false,
    origine: false,
    produit_biologique: false,
  },
  isFetching: false,
  hasFetched: false,
  fetchedDate: null,
  hasError: false,
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PRODUCTS_SUCCESS:
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
    case PRODUCTS_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    case PRODUCTS_FILTER_COLUMN:
      return {
        ...state,
        columns: Object.assign({}, state.columns, action.column)
      };
    default:
      return state;
  }
}
