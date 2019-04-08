import {
  SESSION_UPDATE,
  SESSION_CREATE
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
  limit: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SESSION_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SESSION_CREATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
