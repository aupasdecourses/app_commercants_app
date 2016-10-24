import {
  PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAIL, NOTIFY_SEND, NOTIFY_RECEIVE
} from '../constants/ActionTypes';

const initialState = {
  item: {},
  role: null,
  isFetching: false,
  hasFetched: false,
  hasError: false
};

export default function profile(state = initialState, action) {
  if (
    typeof window === 'object' && window.bgBadge &&
    (action.type === NOTIFY_SEND || action.type === NOTIFY_RECEIVE)
  ) {
    window.bgBadge(state.count); return state;
  }

  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasFetched: false,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        item: action.payload.data,
        role: action.payload.data.roles ? action.payload.data.roles[0] : 'ROLE_USER',
        isFetching: false,
        hasFetched: true,
        hasError: false
      };
    case PROFILE_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true
      };
    default:
      return state;
  }
}
