import {
  PRODUCTS_REQUEST, PRODUCT_REQUEST, PRODUCT_SAVE_REQUEST,
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

export function saveProduct(id, data) {
  const method = id ? 'PUT' : 'POST';

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
