import moment from 'moment';

import {
  SHOPS_REQUEST,
} from '../constants/ActionTypes';

export function fetchShops(filters, short = false) {
  if (short) {
    filters = {
      ...filters,
      _only: ['id', 'name', 'productMerchant'],
      limit: 0,
    };
  }

  return {
    type: SHOPS_REQUEST,
    payload: {
      request: {
        url: '/shops',
        method: 'GET',
        params: filters,
      },
    },
  };
}

export function fetchShopsIfNeeded(filters, short = false) {
  return (dispatch, getState) => {
    const { shops } = getState();

    if (!shops.fetchedDate) {
      return dispatch(fetchShops(filters, short));
    }

    const today = moment();
    const diff = today.diff(moment(shops.fetchedDate), 'minutes');

    if (diff >= 0) {
      return dispatch(fetchShops(filters, short));
    }

    return null;
  };
}
