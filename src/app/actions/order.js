import {
  ORDERS_REQUEST, ORDER_REQUEST, ORDERS_FILTER_COLUMN,
} from '../constants/ActionTypes';

export function fetchOrder(id) {
  return {
    type: ORDER_REQUEST,
    payload: {
      request: {
        url: `/order/${id}`,
        method: 'GET',
      },
    },
  };
}

export function fetchOrders(filters) {
  return {
    type: ORDERS_REQUEST,
    payload: {
      request: {
        url: '/orders',
        method: 'GET',
        params: filters,
      },
    },
  };
}

export function filterColumn(column) {
  return {
    type: ORDERS_FILTER_COLUMN,
    column,
  };
}