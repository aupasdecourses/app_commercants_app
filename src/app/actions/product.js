import {
  PRODUCTS_REQUEST, PRODUCT_REQUEST, PRODUCT_SAVE_REQUEST, PRODUCTS_FILTER_COLUMN,
} from '../constants/ActionTypes';

export function fetchProduct(id) {
  return {
    type: PRODUCT_REQUEST,
    payload: {
      request: {
        url: `/products/${id}`,
        method: 'GET',
      },
    },
  };
}

export function fetchProducts(filters) {
  return {
    type: PRODUCTS_REQUEST,
    payload: {
      request: {
        url: '/products',
        method: 'GET',
        params: filters,
      },
    },
  };
}

export function saveProduct(id, data, methodType = null) {
  let method;

  if (methodType) {
    method = methodType;
  } else {
    method = id ? 'PUT' : 'POST';
  }

  return {
    type: PRODUCT_SAVE_REQUEST,
    payload: {
      request: {
        url: `/products${id ? `/${id}` : ''}`,
        method,
        data,
      },
    },
  };
}

export function uploadToProduct(id, data) {
  return {
    type: PRODUCT_SAVE_REQUEST,
    payload: {
      request: {
        url: `/products/${id}/uploads`,
        method: 'POST',
        data,
      },
    },
  };
}

export function filterColumn(column) {
  return {
    type: PRODUCTS_FILTER_COLUMN,
    column,
  };
}