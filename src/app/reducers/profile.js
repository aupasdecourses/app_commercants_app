import {
  PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAIL, NOTIFY_SEND, NOTIFY_RECEIVE
} from '../constants/ActionTypes';

const initialState = {
  item: {},
  isFetching: false,
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
        isFetching: true
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        item: action.payload.data.user,
        isFetching: false,
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
