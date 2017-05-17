import {
  NOTIFICATION_OPEN, NOTIFICATION_CLOSE, PIN_CHANGE,
} from '../constants/ActionTypes';

const initialState = {
  fetching: false,
  notification: {},
  pinned: 0,
};

export default function ui(state = initialState, action) {
  let type;

  if (action.type.substr(-7) === 'REQUEST') {
    type = 'FETCHING_START';
  } else if (
    action.type.substr(-7) === 'SUCCESS'
    || action.type.substr(-4) === 'FAIL'
  ) {
    type = 'FETCHING_STOP';
  }

  switch (type) {
    case 'FETCHING_START':
      return {
        ...state,
        fetching: true,
      };
    case 'FETCHING_STOP':
      return {
        ...state,
        fetching: false,
      };
    default:
  }

  switch (action.type) {
    case PIN_CHANGE:
      return {
        ...state,
        pinned: action.data
      };
    case NOTIFICATION_OPEN:
      return {
        ...state,
        notification: {
          type: action.data.type,
          message: action.data.message,
        },
      };
    case NOTIFICATION_CLOSE:
      return {
        ...state,
        notification: {},
      };
    default:
      return state;
  }
}
