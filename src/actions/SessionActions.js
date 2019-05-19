import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  SESSION_UPDATE,
  SESSION_CREATE,
  SESSIONS_FETCH_SUCCESS,
  SESSION_SAVE_SUCCESS
} from './types';

export const sessionUpdate = ({ prop, value }) => {
  return {
    type: SESSION_UPDATE,
    payload: { prop, value }
  };
};

export const sessionCreate = ({ buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit, venue, venueDetails }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref(`users/${currentUser.uid}/sessions`)
    .push({ buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit, venue, venueDetails })
    .then(() => {
    dispatch({ type: SESSION_CREATE });
    Actions.main();
   });
  };
};

export const sessionsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/sessions`)
      .on('value', snapshot => {
        dispatch({ type: SESSIONS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const sessionSave = ({ buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit, venue, venueDetails, uid}) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/sessions/${uid}`)
      .set({ buyin, cashedout, time, sessionstart, sessionend, gametype, bigblind, smallblind, location, limit, venue, venueDetails })
      .then(()=> {
        dispatch({ type: SESSION_SAVE_SUCCESS });
        Actions.sessionList({ type: 'reset' });
        Actions.main();
      });
  };
};
