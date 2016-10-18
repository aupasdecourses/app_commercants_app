import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, NOTIFY_SEND, NOTIFY_RECEIVE
} from '../constants/ActionTypes';

const initialState = {
  credentials: {},
  token: null,
  expire: null,
  refreshToken: null,
  isAuthenticating: false,
  isAuthenticated: false,
  hasError: false
};

export default function auth(state = initialState, action) {
  if (
    typeof window === 'object' && window.bgBadge &&
    (action.type === NOTIFY_SEND || action.type === NOTIFY_RECEIVE)
  ) {
    window.bgBadge(state.count); return state;
  }

  switch (action.type) {
    case LOGIN_REQUEST: {
      const credentials = {
        username: action.payload.request.data.username,
        password: action.payload.request.data.password
      };

      return {
        ...state,
        credentials,
        isAuthenticating: true,
      };
    }
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.data.access_token,
        refreshToken: action.payload.data.refresh_token,
        expire: Date.now() + parseInt(action.payload.data.expires_in * 1000, 10),
        isAuthenticating: false,
        isAuthenticated: true,
        hasError: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticating: false,
        isAuthenticated: false,
        hasError: true
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        expire: null,
        refreshToken: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
