import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SessionFormReducer from './SessionFormReducer';
import SessionsReducer from './SessionReducer';

export default combineReducers({
  auth: AuthReducer,
  sessionForm: SessionFormReducer,
  sessions: SessionsReducer
});
