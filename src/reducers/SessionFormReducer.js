import {
  SESSION_UPDATE,
  SESSION_CREATE,
  SESSION_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  buyin: '',
  cashedout: '',
  sessionstart: '',
  sessionend: '',
  time: '',
  gametype: '',
  bigblind: '',
  smallblind: '',
  location: '',
  limit: '',
  venue: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SESSION_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SESSION_CREATE:
      return INITIAL_STATE;
    case SESSION_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
